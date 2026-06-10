import { CreditCard, Calendar, CheckCircle } from "lucide-react";

export default function RenewMembership() {
  const currentPlan = {
    name: "Premium",
    expiry: "15 March 2026",
    price: 12000,
  };

  const plans = [
    { name: "Basic", duration: "1 Month", price: 3000 },
    { name: "Standard", duration: "3 Months", price: 7000 },
    { name: "Premium", duration: "6 Months", price: 12000 },
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div
                key={plan.name}
                className="bg-[#11162a] rounded-xl p-6 space-y-4 border border-white/10 hover:border-purple-500 transition"
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.duration}</p>
                <p className="text-3xl font-bold">PKR {plan.price}</p>

                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Full Gym Access</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Locker Facility</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Support</li>
                </ul>

                <button className="w-full bg-purple-600 py-2 rounded-lg font-semibold hover:bg-purple-700">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-[#11162a] rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <CreditCard className="text-indigo-400" />
            <span>Online Payment / Cash at Gym</span>
          </div>
          <button className="mt-4 w-full bg-green-600 py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2">
            <Calendar size={18} /> Confirm & Renew
          </button>
        </div>

      </div>
    </div>
  );
}
