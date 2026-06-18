import { useState, useEffect, useContext } from "react";
import { Plus, Edit, Trash2, CheckCircle, BadgeCheck } from "lucide-react";
import axios from "axios";
import baseAPI from "./../../Config/Baseapi";
import { MainContext } from "../../Maincontext/Context";

export default function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const { token } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); 
  // { type: "create" | "edit" | "delete", id?: string }

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "1 Month",
    features: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  // ================= API =================
  const API = axios.create({
    baseURL: `${baseAPI}/api`,
  });

  API.interceptors.request.use((req) => {
    const authToken = token || localStorage.getItem("token");
    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
  });

  // ================= GET PLANS =================
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await API.get("/plans/memberships");
      setPlans(res.data.plans);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.price || !form.duration) return;

      setActionLoading({ type: "create" });

      const payload = {
        planName: form.name,
        price: Number(form.price),
        duration: form.duration,
        features: form.features.split(",").map((f) => f.trim()),
        isActive: form.status === "Active",
      };

      if (editId) {
        setActionLoading({ type: "edit", id: editId });
        await API.put(`/plans/updatemembership/${editId}`, payload);
      } else {
        await API.post("/plans/createmembership", payload);
      }

      setForm({
        name: "",
        price: "",
        duration: "1 Month",
        features: "",
        status: "Active",
      });

      setEditId(null);
      fetchPlans();
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // ================= EDIT =================
  const handleEdit = (plan) => {
    setForm({
      name: plan.planName,
      price: plan.price,
      duration: plan.duration,
      features: plan.features.join(", "),
      status: plan.isActive ? "Active" : "Inactive",
    });

    setEditId(plan._id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      setActionLoading({ type: "delete", id });
      await API.delete(`/plans/deletmembership/${id}`);
      fetchPlans();
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Membership Plans</h1>
        </div>

        {/* FORM */}
        <div className="bg-[#0e1424] border border-purple-600 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BadgeCheck className="text-purple-500" />
            {editId ? "Update Plan" : "Create New Plan"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

            <input
              placeholder="Plan Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#0b0f1a] rounded-xl px-4 py-3 border border-gray-700"
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="bg-[#0b0f1a] rounded-xl px-4 py-3 border border-gray-700"
            />

            {/* ✅ DURATION SELECT ADDED */}
            <select
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="bg-[#0b0f1a] rounded-xl px-4 py-3 border border-gray-700"
            >
              {["1 Month", "3 Months", "6 Months", "1 Year"].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <input
              placeholder="Features (comma)"
              value={form.features}
              onChange={(e) =>
                setForm({ ...form, features: e.target.value })
              }
              className="bg-[#0b0f1a] rounded-xl px-4 py-3 border border-gray-700"
            />

            {/* STATUS */}
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-[#0b0f1a] rounded-xl px-4 py-3 border border-gray-700"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          <button
            onClick={handleSubmit}
            disabled={actionLoading?.type === "create"}
            className="mt-6 bg-purple-600 px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
          >
            <Plus size={18} />
            {actionLoading?.type === "create"
              ? "Loading..."
              : editId
              ? "Update Plan"
              : "Add Plan"}
          </button>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-[#0e1424] border border-gray-700 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">

                <h3 className="text-2xl font-semibold">
                  {plan.planName}
                </h3>

                {/* ✅ ACTIVE / INACTIVE BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    plan.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-gray-400 text-sm">{plan.duration}</p>
              <p className="text-3xl font-bold my-4 text-purple-400">
                PKR {plan.price}
              </p>

              <ul className="space-y-2 text-sm text-gray-300">
                {plan.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-purple-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => handleEdit(plan)}
                  disabled={actionLoading?.type === "edit"}
                  className="flex-1 border border-gray-600 rounded-xl py-2 disabled:opacity-50"
                >
                  {actionLoading?.type === "edit" &&
                  actionLoading?.id === plan._id
                    ? "Loading..."
                    : "Edit"}
                </button>

                <button
                  onClick={() => handleDelete(plan._id)}
                  disabled={actionLoading?.type === "delete"}
                  className="flex-1 border border-red-500 text-red-400 rounded-xl py-2 disabled:opacity-50"
                >
                  {actionLoading?.type === "delete" &&
                  actionLoading?.id === plan._id
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}