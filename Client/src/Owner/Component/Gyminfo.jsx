import React, { useContext, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";

import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";
import { toast } from "react-toastify";

export default function Gyminfo() {
  const { token } = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  const [bannerPreview, setBannerPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [bannerFile, setBannerFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const [form, setForm] = useState({
    gymName: "",
    phone: "",
    email: "",
    address: "",
    open: "",
    close: "",
    about: "",
    facilities: ["", "", ""],
  });

  // ================= FILE HANDLERS =================

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFacilityChange = (index, value) => {
    const updated = [...form.facilities];
    updated[index] = value;
    setForm({ ...form, facilities: updated });
  };

  // ================= delet API =================
  const handleDelete= async()=>{
     if (loading) return;
    try {
        setLoading(true);
          const res = await axios.put( `${baseAPI}/api/gym/deleteGym` ,  { form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
    } catch (error) {
        
    }
  }
// =============update API ===========================================

  const handleSubmit = async () => {
    if (loading) return;

    try {
      setLoading(true);
//  
      const res = await axios.put( `${baseAPI}/api/gym/updateGym` ,  { form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Gym updated successfully!");
      console.log(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white">Gym Information</h2>

      {/* ================= BANNER ================= */}
      <div className="relative mt-5 mb-10">
        <div className="h-30 rounded-xl overflow-hidden border border-indigo-500 bg-[#0b0f1a]">
          {bannerPreview ? (
            <img src={bannerPreview} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Upload Banner
            </div>
          )}
        </div>

        {/* LOGO */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-4 border-[#0b0f1a] bg-[#070b14] overflow-hidden flex items-center justify-center shadow-lg">
              {logoPreview ? (
                <img src={logoPreview} className="w-full h-full object-cover" />
              ) : (
                <User className="text-gray-400" size={30} />
              )}
            </div>

            <input type="file" onChange={handleLogoChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* ================= BANNER BUTTON ================= */}
      <div className="flex justify-between items-center mb-10 mt-16">
        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
          Upload Banner
          <input type="file" onChange={handleBannerChange} className="hidden" />
        </label>

        <p className="text-gray-400 text-sm">Recommended: 1200 x 400</p>
      </div>

      {/* ================= INPUTS ================= */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Gym Name" name="gymName" onChange={handleChange} />
        <Input label="Phone" name="phone" onChange={handleChange} />
        <Input label="Email" name="email" onChange={handleChange} />
        <Input label="Address" name="address" onChange={handleChange} />
        <Input label="Opening Time" name="open" type="time" onChange={handleChange} />
        <Input label="Closing Time" name="close" type="time" onChange={handleChange} />
      </div>

      {/* ================= FACILITIES ================= */}
      <div className="mt-6">
        <div className="grid md:grid-cols-3 gap-3">
          {form.facilities.map((f, i) => (
            <input
              key={i}
              value={f}
              onChange={(e) => handleFacilityChange(i, e.target.value)}
              placeholder={`Facility ${i + 1}`}
              className="bg-[#0b0f1a] border border-gray-800 rounded-lg p-3 text-white"
            />
          ))}
        </div>
      </div>

      {/* ================= ABOUT ================= */}
      <div className="mt-6">
        <textarea
          name="about"
          onChange={handleChange}
          rows={5}
          placeholder="Write about your gym..."
          className="w-full bg-[#0b0f1a] border border-gray-800 rounded-lg p-3 text-white"
        />
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <div className="mt-6 flex justify-between">
            <button
          onClick={handleDelete}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-900"
          }`}
        >
          {loading ? "Deleting...." : "Delet Account"}
        </button>

      
        {/* ============================== */}
          <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>


     
        {/* =============================== */}
      </div>
    </div>
  );
}

// ================= INPUT COMPONENT =================

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full bg-[#0b0f1a] border border-gray-800 rounded-lg p-3 text-white outline-none focus:border-indigo-500"
      />
    </div>
  );
}