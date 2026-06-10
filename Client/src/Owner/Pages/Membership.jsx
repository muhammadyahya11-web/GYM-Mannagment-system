import { useState } from "react";
import { Plus, Edit, Trash2, CheckCircle, BadgeCheck } from "lucide-react";

export default function MembershipPlans() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Basic",
      price: 3000,
      duration: "1 Month",
      features: ["Gym Access", "Locker Facility"],
      status: "Active",
    },
    {
      id: 2,
      name: "Standard",
      price: 7000,
      duration: "3 Months",
      features: ["Gym + Cardio", "Locker", "Free Assessment"],
      status: "Active",
    },
    {
      id: 3,
      name: "Premium",
      price: 12000,
      duration: "6 Months",
      features: ["All Access", "Personal Trainer", "Diet Plan"],
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.duration) return;

    const formattedPlan = {
      ...form,
      price: Number(form.price),
      features: form.features.split(",").map((f) => f.trim()),
    };

    if (editId) {
      setPlans(plans.map((p) => (p.id === editId ? { ...p, ...formattedPlan } : p)));
      setEditId(null);
    } else {
      setPlans([...plans, { ...formattedPlan, id: Date.now() }]);
    }

    setForm({ name: "", price: "", duration: "", features: "", status: "Active" });
  };

  const handleEdit = (plan) => {
    setForm({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: plan.features.join(", "),
      status: plan.status,
    });
    setEditId(plan.id);
  };

  const handleDelete = (id) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Membership Plans</h1>
          <span className="text-sm text-gray-400">Manage gym subscriptions professionally</span>
        </div>

        {/* FORM CARD */}
        <div className="bg-[#0e1424] border border-purple-600 rounded-2xl p-6 mb-12 shadow-[0_20px_60px_rgba(147,51,234,0.35)]">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BadgeCheck className="text-purple-500" /> {editId ? "Update Plan" : "Create New Plan"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              { placeholder: "Plan Name", key: "name" },
              { placeholder: "Price (PKR)", key: "price", type: "number" },
              { placeholder: "Duration (e.g. 1 Month)", key: "duration" },
              { placeholder: "Features (comma separated)", key: "features" },
            ].map((item) => (
              <input
                key={item.key}
                type={item.type || "text"}
                placeholder={item.placeholder}
                className="bg-[#0b0f1a] rounded-xl px-4 py-3 outline-none border border-gray-700 focus:border-purple-500"
                value={form[item.key]}
                onChange={(e) => setForm({ ...form, [item.key]: e.target.value })}
              />
            ))}

            <select
              className="bg-[#0b0f1a] rounded-xl px-4 py-3 outline-none border border-gray-700 focus:border-purple-500"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} /> {editId ? "Update Plan" : "Add Plan"}
          </button>
        </div>

        {/* PLAN CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#0e1424] border border-gray-700 rounded-2xl p-6 shadow-lg hover:border-purple-500 transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    plan.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {plan.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm">{plan.duration}</p>
              <p className="text-3xl font-bold my-4 text-purple-400">PKR {plan.price}</p>

              <ul className="space-y-2 text-sm text-gray-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-purple-500" /> {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 border border-gray-600 hover:border-purple-500 rounded-xl py-2 flex items-center justify-center gap-2"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="flex-1 border border-red-500/60 text-red-400 hover:bg-red-500/10 rounded-xl py-2 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}