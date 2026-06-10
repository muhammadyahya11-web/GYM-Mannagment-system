import { MapPin, Phone, Mail, Clock, Dumbbell, Star } from "lucide-react";

export default function GymProfile() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
          alt="Gym Cover"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-black font-bold text-xl">
            GYM
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Iron House Gym</h1>
            <div className="flex items-center gap-1 text-yellow-400">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} />)}
              <span className="text-sm text-white ml-2">5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Contact Info",
            items: [
              <><MapPin size={16}/> Main Boulevard</>,
              <><Phone size={16}/> +92 300 1234567</>,
              <><Mail size={16}/> ironhouse@gym.com</>,
            ]
          },
          {
            title: "Working Hours",
            items: [
              <><Clock size={16}/> Mon–Sat: 6AM–11PM</>,
              <><Clock size={16}/> Sunday: Closed</>,
            ]
          },
          {
            title: "Facilities",
            items: [
              <><Dumbbell size={16}/> Modern Equipment</>,
              <><Dumbbell size={16}/> Personal Training</>,
              <><Dumbbell size={16}/> Cardio Zone</>,
            ]
          }
        ].map((card, i) => (
          <div key={i} className="bg-[#111827] rounded-xl p-4 space-y-3">
            <h2 className="font-semibold text-lg">{card.title}</h2>
            {card.items.map((item, idx) => (
              <div key={idx} className="flex gap-2 text-sm text-gray-300">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* About */}
      <div className="bg-[#111827] rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-2">About Gym</h2>
        <p className="text-gray-300 text-sm">
          Iron House Gym is a premium fitness center focused on fat loss,
          muscle building, and overall transformation.
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
