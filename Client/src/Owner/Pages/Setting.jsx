import { useState } from "react";
import {User,Dumbbell,Lock,Bell,} from "lucide-react";
import Gyminfo from "../Component/Gyminfo";


export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");




  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-gray-400">
          Manage profile, gym branding and system preferences
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <aside className="bg-[#141c2f] rounded-2xl p-4 space-y-1 h-fit">
          <Tab icon={User} label="Profile" value="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab icon={Dumbbell} label="Gym Info" value="gym" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab icon={Lock} label="Security" value="security" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab icon={Bell} label="Notifications" value="notification" activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        {/* CONTENT */}
        <section className="xl:col-span-3 bg-[#141c2f] rounded-2xl p-6">

          {activeTab === "profile" && <div>Profile Section</div>}

          {activeTab === "gym" && (
            <Gyminfo />
          )}

          {activeTab === "security" && <div>Security Section</div>}
          {activeTab === "notification" && <div>Notification Section</div>}
        </section>
      </div>
    </div>
  );
}

/* ================= TAB ================= */
function Tab({ icon: Icon, label, value, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${
        activeTab === value
          ? "bg-indigo-600"
          : "text-gray-300 hover:bg-[#1b2440]"
      }`}
    >
      <Icon size={16} /> {label}
    </button>
  );
}