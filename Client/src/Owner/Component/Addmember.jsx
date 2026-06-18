import React, { useState, useContext } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Save,
  Lock,
  Upload,
} from "lucide-react";
import { toast } from "react-toastify";
import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";

export default function AddMember() {
  const { token } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    membershipType: "",
    joinDate: "",
    status: "Active",
  });

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (loading) return;

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.age 
      
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        age: form.age,
        membershipType: form.membershipType,
        joinDate: form.joinDate,
        isActive: form.status === "Active",
      };

      const res = await axios.post(
        `${baseAPI}/api/member/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message || "Member added successfully"
      );

      // RESET
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        membershipType: "",
        joinDate: "",
        status: "Active",
      });

      setImagePreview(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Member</h1>
        <p className="text-gray-400 mt-1">
          Add a new gym member.
        </p>
      </div>

      <div className="bg-[#111827] rounded-2xl p-6 shadow-lg">
        {/* IMAGE */}
        {/* <div className="flex justify-center mb-8">
          <label className="cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-[#1f2937] border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <User size={30} />
                  <Upload size={16} />
                </div>
              )}
            </div>

            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div> */}

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            icon={<User size={18} />}
            label="Member Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            icon={<Mail size={18} />}
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            icon={<Lock size={18} />}
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <Input
            icon={<Phone size={18} />}
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            icon={<User size={18} />}
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
          />

          <Input
            icon={<Calendar size={18} />}
            label="Join Date"
            name="joinDate"
            type="date"
            value={form.joinDate}
            onChange={handleChange}
          />

          <Input
            icon={<User size={18} />}
            label="Membership Type"
            name="membershipType"
            value={form.membershipType}
            onChange={handleChange}
            placeholder="Monthly / Yearly"
          />

          {/* STATUS */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#0b0f1a] border border-gray-700 rounded-lg p-3 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={() =>
              setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
                age: "",
                membershipType: "",
                joinDate: "",
                status: "Active",
              })
            }
            className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-[#1f2937]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              loading
                ? "bg-gray-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Member"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= INPUT COMPONENT =================
function Input({ icon, label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-2 block">
        {label}
      </label>

      <div className="flex items-center bg-[#0b0f1a] border border-gray-700 rounded-lg px-3">
        <div className="text-gray-400 mr-2">{icon}</div>

        <input
          {...props}
          className="w-full bg-transparent p-3 outline-none"
        />
      </div>
    </div>
  );
}