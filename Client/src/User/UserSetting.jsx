import { useState } from "react";
import { User, Lock, Bell, Sun, Moon } from "lucide-react";

export default function UserSettings() {
  const [profileImg, setProfileImg] = useState("");
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleProfileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">User Settings</h1>

        <div className="bg-[#11162a] rounded-2xl p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              {profileImg ? (
                <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-purple-500" />
              ) : (
                <div className="w-full h-full rounded-full bg-[#0e1424] flex items-center justify-center border-4 border-purple-500">
                  <User className="text-purple-500 w-16 h-16" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
              />
            </div>
            <h2 className="text-xl font-semibold">{username}</h2>
            <p className="text-gray-400">{email}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="text-purple-500" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <User className="text-purple-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <Lock className="text-purple-500" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="New Password"
                className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
              />
            </div>

            <div className="flex items-center justify-between bg-[#0e1424] p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Bell className="text-purple-500" />
                <span>Enable Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={e => setNotifications(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between bg-[#0e1424] p-3 rounded-xl">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="text-purple-500" /> : <Sun className="text-yellow-500" />}
                <span>Dark Mode</span>
              </div>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={e => setDarkMode(e.target.checked)}
                className="w-5 h-5"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold w-full text-lg"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
