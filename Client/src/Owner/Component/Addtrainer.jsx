import React, { useContext, useState } from "react";
import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  User,Upload,
  Phone,
  Mail,
  Dumbbell,
  Briefcase,
  Save,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";
import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";


export default function AddTrainer() {
    
  const { token } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    experience: "",
    status: "Active",
    about: "",
  });

//   ===============================================

   // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

// ================= IMAGE PREVIEW ONLY =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ================= FETCH TRAINER FOR EDIT =================
  useEffect(() => {
    if (id) {
      fetchTrainer(id);
    }
  }, [id]);

  const fetchTrainer = async (trainerId) => {
    try {
      const res = await axios.get(
        `${baseAPI}/api/trainer/get/${trainerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.trainer;
      setForm({
        name: data.name || "",
        password: data.password || "",
        email: data.email || "",
        phone: data.phone || "",
        specialization: data.specialization || "",
        experience: data.experience || "",
        status: data.isActive ? "Active" : "Inactive",
        about: data.about || "",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch trainer data");
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
      !form.specialization ||
      !form.experience
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
        specialization: form.specialization,
        experience: form.experience,
        isActive: form.status === "Active",
        about: form.about,
      };

      let res;

      if (id) {
        res = await axios.put(
          `${baseAPI}/api/trainer/update/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Trainer updated successfully");
      } else {
        res = await axios.post(
          `${baseAPI}/api/trainer/add`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Trainer added successfully");

        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          specialization: "",
          experience: "",
          status: "Active",
          about: "",
        });
      }

      setImagePreview(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
};
      
  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add Trainer
        </h1>

        <p className="text-gray-400 mt-1">
          Add a new trainer to your gym.
        </p>
      </div>

      <div className="bg-[#111827] rounded-2xl p-6 shadow-lg">
        {/* Photo Upload */}
        <div className="flex justify-center mb-8">
          <label className="cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-[#1f2937] border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <User size={30} />
                  <Upload
                    size={16}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            icon={<User size={18} />}
            label="Trainer Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter trainer name"
          />

          <Input
            icon={<Mail size={18} />}
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <Input
            icon={<Lock size={18} />}
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <Input
            icon={<Phone size={18} />}
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="03XXXXXXXXX"
          />

          <Input
            icon={<Dumbbell size={18} />}
            label="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Weight Training"
          />

          <Input
            icon={<Briefcase size={18} />}
            label="Experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 5 Years"
          />

          {/* Status */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-[#0b0f1a] border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="text-sm text-gray-400 mb-2 block">
            About Trainer
          </label>

          <textarea
            rows={5}
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="Write something about this trainer..."
            className="w-full bg-[#0b0f1a] border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={() => {
              setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
                specialization: "",
                experience: "",
                status: "Active",
                about: "",
              });

              setImagePreview(null);
            }}
            className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-[#1f2937]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Save size={18} />

            {loading
              ? "Saving..."
              : "Save Trainer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-2 block">
        {label}
      </label>

      <div className="flex items-center bg-[#0b0f1a] border border-gray-700 rounded-lg px-3">
        <div className="text-gray-400 mr-2">
          {icon}
        </div>

        <input
          {...props}
          className="w-full bg-transparent p-3 outline-none"
        />
      </div>
    </div>
  );
}