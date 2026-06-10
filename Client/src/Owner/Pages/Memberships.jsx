import { useState } from "react";
import {
  Check,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

export default function MembershipPlans() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      price: billing === "monthly" ? 3000 : 30000,
      features: [
        "Gym Access",
        "Basic Equipment",
        "Locker Access",
      ],
    },
    {
      name: "Standard",
      price: billing === "monthly" ? 5000 : 50000,
      features: [
        "Gym + Cardio",
        "Trainer Support",
        "Locker + Shower",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: billing === "monthly" ? 8000 : 80000,
      features: [
        "All Access",
        "Personal Trainer",
        "Diet Plan",
        "Priority Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Membership Plans
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Create, manage and customize gym membership plans
          </p>
        </div>

        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Plan
        </button>
      </div>

      {/* BILLING TOGGLE */}
      <div className="flex items-center justify-center mb-10">
        <div className="bg-[#141c2f] p-1 rounded-xl flex">
          <ToggleButton
            active={billing === "monthly"}
            onClick={() => setBilling("monthly")}
            label="Monthly"
          />
          <ToggleButton
            active={billing === "yearly"}
            onClick={() => setBilling("yearly")}
            label="Yearly"
          />
        </div>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-[#141c2f] rounded-2xl p-6 border ${
              plan.popular
                ? "border-indigo-500"
                : "border-[#1b2440]"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-6 bg-indigo-600 text-xs px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <h2 className="text-xl font-semibold mb-2">
              {plan.name}
            </h2>

            <div className="mb-4">
              <span className="text-3xl font-bold">
                Rs {plan.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">
                /{billing}
              </span>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="w-4 h-4 text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* ACTIONS */}
            <div className="flex items-center justify-between">
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm">
                Select Plan
              </button>

              <div className="flex gap-2">
                <button className="p-2 hover:bg-[#1b2440] rounded-lg">
                  <Pencil className="w-4 h-4 text-blue-400" />
                </button>
                <button className="p-2 hover:bg-[#1b2440] rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ToggleButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-indigo-600 text-white"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
