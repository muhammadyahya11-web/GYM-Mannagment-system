import Axios from "axios";
import { CreditCard, Calendar, CheckCircle, Loader2 } from "lucide-react";
import baseAPI from "../Config/Baseapi";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "./../Maincontext/Context";

export default function RenewMembership() {
  const { token } = useContext(MainContext);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      if (!token) return;
      try {
        const res = await Axios.get(`${baseAPI}/api/plans/memberships`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(res.data.plans || []);
      } catch (error) {
        console.log("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, [token]);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCashPayment = async () => {
    if (!selectedPlan || !token) return;
    setLoading(true);
    setPaymentStatus("");
    try {
      const res = await Axios.post(
        `${baseAPI}/api/payment/cash`,
        { planId: selectedPlan._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setPaymentStatus("Cash payment recorded! Please pay at the gym.");
        // Redirect to success page
        setTimeout(() => {
          window.location.href = "/payment-success";
        }, 1500);
      }
    } catch (err) {
      setPaymentStatus(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = async () => {
    if (!selectedPlan || !token) return;
    setLoading(true);
    setPaymentStatus("");
    try {
      const response = await Axios.post(
        `${baseAPI}/api/payment/stripe/checkout`,
        { planId: selectedPlan._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && response.data.url) {
        window.location.href = response.data.url;
      } else {
        setPaymentStatus(response.data.message || "Failed to create checkout");
      }
    } catch (err) {
      setPaymentStatus(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const currentPlan = {
    name: "Premium",
    expiry: "15 March 2026",
    price: 12000,
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-[#11162a] rounded-2xl p-6">
          <h1 className="text-2xl font-bold">Renew Membership</h1>
          <p className="text-sm text-gray-400 mt-1">
            Extend your gym access by renewing your membership plan
          </p>
        </div>

        {/* Current Plan */}
        <div className="bg-[#11162a] rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">Current Plan</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 text-sm text-gray-400">
              <p><span className="text-white">Plan:</span> {currentPlan.name}</p>
              <p><span className="text-white">Expiry:</span> {currentPlan.expiry}</p>
            </div>
            <div className="bg-purple-600 px-5 py-3 rounded-xl font-semibold">
              PKR {currentPlan.price}
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Choose a Plan</h2>

          {plans.length === 0 ? (
            <div className="bg-[#11162a] rounded-xl p-6 text-center">
              <p className="text-gray-400">No membership plans available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map(plan => (
                <div
                  key={plan._id}
                  className={`bg-[#11162a] rounded-xl p-6 space-y-4 border transition cursor-pointer ${
                    selectedPlan?._id === plan._id ? "border-purple-500" : "border-white/10 hover:border-purple-500"
                  }`}
                  onClick={() => selectPlan(plan)}
                >
                  <h3 className="text-xl font-semibold">{plan.planName}</h3>
                  <p className="text-sm text-gray-400">{plan.duration}</p>
                  <p className="text-3xl font-bold">PKR {plan.price}</p>

                  <ul className="text-sm text-gray-400 space-y-2">
                    {plan.features && Array.isArray(plan.features) ? (
                      plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" /> {feature}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" /> Full Gym Access
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" /> Locker Facility
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" /> Support
                        </li>
                      </>
                    )}
                  </ul>

                  <button className="w-full bg-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-700">
                    {selectedPlan?._id === plan._id ? "Selected" : "Select Plan"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Method Selection */}
        {selectedPlan && (
          <div className="bg-[#11162a] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Cash at Gym</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Credit/Debit Card (Stripe)</span>
              </label>
            </div>

            {paymentStatus && (
              <div className="bg-blue-600/20 p-3 rounded-lg">
                <p className="text-blue-400 text-sm">{paymentStatus}</p>
              </div>
            )}

            <button
              onClick={paymentMethod === "cash" ? handleCashPayment : handleCardPayment}
              disabled={loading}
              className="mt-4 w-full bg-green-600 py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Calendar size={18} />}
              {loading ? "Processing..." : "Confirm & Renew"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}