import { useState } from "react";
import {
  User,
  Dumbbell,
  Lock,
  Bell,
  Save,
  Image as ImageIcon,
} from "lucide-react";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Image
  const [profilePreview, setProfilePreview] = useState(null);

  // Gym Banner
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerPreview(URL.createObjectURL(file));
  };

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
          <Tab icon={User} label="Profile" value="profile" {...{ activeTab, setActiveTab }} />
          <Tab icon={Dumbbell} label="Gym Info" value="gym" {...{ activeTab, setActiveTab }} />
          <Tab icon={Lock} label="Security" value="security" {...{ activeTab, setActiveTab }} />
          <Tab icon={Bell} label="Notifications" value="notification" {...{ activeTab, setActiveTab }} />
        </aside>

        {/* CONTENT */}
        <section className="xl:col-span-3 bg-[#141c2f] rounded-2xl p-6">
          {activeTab === "profile" && (
            <ProfileSection
              profilePreview={profilePreview}
              handleProfileChange={handleProfileChange}
            />
          )}

          {activeTab === "gym" && (
            <GymSection
              bannerPreview={bannerPreview}
              handleBannerChange={handleBannerChange}
            />
          )}

          {activeTab === "security" && <SecuritySection />}
          {activeTab === "notification" && <NotificationSection />}
        </section>
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR TAB ---------------- */

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

/* ---------------- PROFILE ---------------- */

function ProfileSection({ profilePreview, handleProfileChange }) {
  return (
    <>
      <Header title="Owner Profile" subtitle="Update personal information" />

      {/* PROFILE IMAGE */}
      <div className="mb-6 flex items-center gap-6">
        {profilePreview ? (
          <img
            src={profilePreview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-[#0b0f1a] border border-[#1b2440] flex items-center justify-center text-gray-400">
            <User size={32} />
          </div>
        )}

        <label className="cursor-pointer text-sm bg-[#1b2440] px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
          Change Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
            className="hidden"
          />
        </label>
      </div>

      <Grid>
        <Input label="Full Name" placeholder="Muhammad Yahya" />
        <Input label="Email" placeholder="owner@gym.com" />
        <Input label="Phone" placeholder="+92 3XX XXXXXXX" />
      </Grid>

      <SaveBtn />
    </>
  );
}

/* ---------------- GYM INFO ---------------- */

function GymSection({ bannerPreview, handleBannerChange }) {
  return (
    <>
      <Header title="Gym Information" subtitle="Branding & business details" />

      {/* Banner Upload */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">Gym Banner</label>
        <div className="border border-dashed border-indigo-500 rounded-xl p-4 flex flex-col items-center justify-center gap-3">
          {bannerPreview ? (
            <img
              src={bannerPreview}
              alt="Banner"
              className="rounded-lg max-h-48 object-cover"
            />
          ) : (
            <ImageIcon className="text-indigo-400" size={40} />
          )}
          <input type="file" accept="image/*" onChange={handleBannerChange} />
        </div>
      </div>

      <Grid>
        <Input label="Gym Name" placeholder="FitPro Gym" />
        <Input label="City" placeholder="Lahore" />
        <Input label="Monthly Fee Range" placeholder="3000 - 8000 PKR" />
      </Grid>

      <TextArea label="Gym Address" placeholder="Complete gym address" />
      <TextArea
        label="About Gym"
        placeholder="Tell members about your gym, facilities, trainers..."
      />

      <SaveBtn />
    </>
  );
}

/* ---------------- SECURITY ---------------- */

function SecuritySection() {
  return (
    <>
      <Header title="Security" subtitle="Change account password" />
      <Grid>
        <Input type="password" label="Current Password" />
        <Input type="password" label="New Password" />
        <Input type="password" label="Confirm Password" />
      </Grid>
      <SaveBtn danger />
    </>
  );
}

/* ---------------- NOTIFICATIONS ---------------- */

function NotificationSection() {
  return (
    <>
      <Header title="Notifications" subtitle="System alerts & emails" />
      <Toggle label="Payment Alerts" />
      <Toggle label="New Member Registration" />
      <Toggle label="Monthly Report Email" />
      <SaveBtn />
    </>
  );
}

/* ---------------- SHARED ---------------- */

function Header({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

function Grid({ children }) {
  return <div className="grid md:grid-cols-2 gap-5 mb-6">{children}</div>;
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-400 mb-2 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#0b0f1a] border border-[#1b2440] rounded-lg p-3 focus:border-indigo-500 outline-none"
      />
    </div>
  );
}

function TextArea({ label, placeholder }) {
  return (
    <div className="mb-6">
      <label className="text-sm text-gray-400 mb-2 block">{label}</label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full bg-[#0b0f1a] border border-[#1b2440] rounded-lg p-3 focus:border-indigo-500 outline-none"
      />
    </div>
  );
}

function Toggle({ label }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm">{label}</span>
      <input type="checkbox" className="accent-indigo-600" />
    </div>
  );
}

function SaveBtn({ danger }) {
  return (
    <div className="flex justify-end">
      <button
        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm ${
          danger
            ? "bg-red-600 hover:bg-red-700"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        <Save size={16} /> Save Changes
      </button>
    </div>
  );
}
