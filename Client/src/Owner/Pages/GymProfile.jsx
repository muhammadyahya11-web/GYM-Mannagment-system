import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Dumbbell,
  Star,
} from "lucide-react";
import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";

export default function GymProfile() {
  const { token} =useContext(MainContext)
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH GYM =================
  const fetchGym = async () => {
    try {
      setLoading(true);

      const res = await axios.get(  `${baseAPI}/api/gym/getGym`, 
         { headers: { Authorization: `Bearer ${token}`, }, }
      );

      setGym(res.data.gym || res.data);
      console.log(res.data);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGym();
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-white p-6">
        Loading Gym Profile...
      </div>
    );
  }

  // ================= NO DATA =================
  if (!gym) {
    return (
      <div className="text-white p-6">
        Gym not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img
          src={gym.banner || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {gym.logo ? (
              <img src={gym.logo} className="w-full h-full object-cover" />
            ) : (
              <span className="text-black  font-bold">{gym.gymName}</span>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {gym.gymName}
            </h1>

            <div className="flex items-center gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} />
              ))}
              <span className="text-sm text-white ml-2">
                5.0 Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Contact */}
        <div className="bg-[#111827] rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-lg">Contact Info</h2>

          <div className="flex gap-2 text-sm text-gray-300">
            <MapPin size={16} />
            {gym.gymadress}
          </div>

          <div className="flex gap-2 text-sm text-gray-300">
            <Phone size={16} />
            {gym.phone}
          </div>

          <div className="flex gap-2 text-sm text-gray-300">
            <Mail size={16} />
            {gym.email}
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-[#111827] rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-lg">Working Hours</h2>

          <div className="flex gap-2 text-sm text-gray-300">
            <Clock size={16} />
            {gym.openingtime} - {gym.closingtime}
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-[#111827] rounded-xl p-4 space-y-3">
          <h2 className="font-semibold text-lg">Facilities</h2>

          {gym.facilities?.map((f, i) => (
            <div key={i} className="flex gap-2 text-sm text-gray-300">
              <Dumbbell size={16} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="bg-[#111827] rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">About Gym</h2>
        <p className="text-gray-300 text-sm">
          { gym.gymbio}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold">
          Join Gym
        </button>

        <button className="w-full border border-gray-600 hover:bg-gray-800 py-3 rounded-xl">
          Contact Owner
        </button>
      </div>
    </div>
  );
}