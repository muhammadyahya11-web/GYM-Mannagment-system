import { useState } from "react";
import { Dumbbell, Calendar, User } from "lucide-react";

export default function UserWorkout() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Chest & Triceps", day: "Monday" },
    { id: 2, name: "Back & Biceps", day: "Tuesday" },
    { id: 3, name: "Legs & Shoulders", day: "Wednesday" },
  ]);

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const addWorkout = () => {
    if (!name || !day) return;
    setWorkouts(prev => [...prev, { id: prev.length + 1, name, day }]);
    setName("");
    setDay("");
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#11162a] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24">
            {profileImg ? (
              <img src={profileImg} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-purple-500" />
            ) : (
              <div className="w-full h-full rounded-full bg-[#0e1424] flex items-center justify-center border-2 border-purple-500">
                <User className="text-purple-500 w-12 h-12" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Workout Planner</h1>
            <p className="text-sm text-gray-400">Manage and track your workouts</p>
          </div>
        </div>

        <div className="bg-[#11162a] rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add Workout</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Workout Name"
              className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
            />
            <input
              type="text"
              value={day}
              onChange={e => setDay(e.target.value)}
              placeholder="Day (e.g., Monday)"
              className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
            />
            <button
              onClick={addWorkout}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-semibold"
            >
              Add Workout
            </button>
          </div>

          <h2 className="text-lg font-semibold">Workout Schedule</h2>
          <div className="space-y-2">
            {workouts.map(w => (
              <div key={w.id} className="flex justify-between items-center bg-[#0e1424] p-3 rounded-xl hover:bg-[#1a1f3a] transition">
                <span className="font-medium">{w.name}</span>
                <span className="text-gray-400">{w.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
