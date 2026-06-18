import Payment from "../Model/PaymentModule.js";
import User from "../Model/UserModel.js";
import Attendance from "../Model/AttendenceModule.js";
import Trainer from "../Model/TrainerModule.js";
import MembershipPlan from "../Model/MembershipModule.js";

const getStripe = async () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) throw new Error("Stripe key not configured");
  const Stripe = (await import("stripe")).default;
  return new Stripe(stripeSecretKey, {
    apiVersion: "2024-06-20",
  });
};

const createCashPayment = async (req, res) => {
  try {
    const { planId } = req.body;
    const memberId = req.user._id || req.user.id;

    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const plan = await MembershipPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Membership plan not found" });
    }

    const payment = await Payment.create({
      gymId: member.gymId,
      memberId: member._id,
      memberName: member.name,
      email: member.email,
      phone: member.whatsapp || member.phone,
      amount: plan.price,
      membershipPlan: plan.planName,
      paymentMethod: "Cash",
      status: "Pending",
      notes: "Cash payment - pending gym confirmation",
    });

    await User.findByIdAndUpdate(memberId, { subscribePlan: plan.planName });

    return res.status(201).json({
      success: true,
      message: "Cash payment recorded successfully",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create cash payment",
      error: error.message,
    });
  }
};

const createStripeCheckout = async (req, res) => {
  try {
    const stripe = await getStripe();
    const { planId } = req.body;
    const memberId = req.user._id || req.user.id;

    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const plan = await MembershipPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Membership plan not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.planName,
              description: plan.features?.join(", ") || "Gym membership",
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/renew`,
      metadata: {
        memberId: member._id.toString(),
        planId: plan._id.toString(),
        planName: plan.planName,
      },
    });

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create checkout session",
      error: error.message,
    });
  }
};

const getMemberPayments = async (req, res) => {
  try {
    const memberId = req.user._id || req.user.id;

    const payments = await Payment.find({ memberId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

const getGymPayments = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id || req.user.id);
    if (!owner || !owner.gymId) {
      return res.status(404).json({ message: "Gym not found" });
    }

    const payments = await Payment.find({ gymId: owner.gymId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};

const getPendingPayments = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id || req.user.id);
    if (!owner || !owner.gymId) {
      return res.status(404).json({ message: "Gym not found" });
    }

    const payments = await Payment.find({ 
      gymId: owner.gymId, 
      status: "Pending" 
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch pending payments",
      error: error.message,
    });
  }
};

const markPaymentPaid = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status: "Paid" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment marked as paid",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update payment",
      error: error.message,
    });
  }
};

const getMonthlyReport = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id || req.user.id);
    if (!owner || !owner.gymId) {
      return res.status(404).json({ message: "Gym not found" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalRevenue, activeMembers, newMembers, pendingPayments, recentPayments] = await Promise.all([
      Payment.aggregate([
        { $match: { gymId: owner.gymId, status: "Paid", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      User.countDocuments({ gymId: owner.gymId, role: "client", status: "Active" }),
      User.countDocuments({ gymId: owner.gymId, role: "client", createdAt: { $gte: startOfMonth } }),
      Payment.aggregate([
        { $match: { gymId: owner.gymId, status: "Pending" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Payment.find({ gymId: owner.gymId, createdAt: { $gte: startOfMonth } })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("memberName membershipPlan amount status createdAt")
    ]);

    return res.status(200).json({
      success: true,
      totalRevenue: totalRevenue[0]?.total || 0,
      activeMembers,
      newMembers,
      pendingPayments: pendingPayments[0]?.total || 0,
      recentPayments: recentPayments.map(p => ({
        ...p._doc,
        date: p.createdAt.toLocaleDateString()
      }))
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch monthly report",
      error: error.message,
    });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const owner = await User.findById(req.user._id || req.user.id);
    if (!owner || !owner.gymId) {
      return res.status(404).json({ message: "Gym not found" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [totalMembers, activeTrainers, todayAttendance, monthlyRevenue, recentPayments, weeklyAttendance] = await Promise.all([
      User.countDocuments({ gymId: owner.gymId, role: "client" }),
      Trainer.countDocuments({ gymId: owner.gymId }),
      Attendance.countDocuments({ 
        gymId: owner.gymId, 
        date: { $gte: today, $lt: tomorrow } 
      }),
      Payment.aggregate([
        { $match: { gymId: owner.gymId, status: "Paid", createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Payment.find({ gymId: owner.gymId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("memberName amount status createdAt"),
      Attendance.find({ gymId: owner.gymId })
        .sort({ date: -1 })
        .limit(7)
    ]);

    return res.status(200).json({
      success: true,
      totalMembers,
      activeTrainers,
      todayAttendance,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      recentPayments: recentPayments.map(p => ({
        ...p._doc,
        date: p.createdAt.toLocaleDateString()
      })),
      weeklyAttendance: weeklyAttendance.map(a => ({
        date: a.date,
        count: 1
      }))
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

export { createCashPayment, createStripeCheckout, getMemberPayments, getGymPayments, getPendingPayments, markPaymentPaid, getMonthlyReport, getDashboardData };