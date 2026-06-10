import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Dumbbell } from "lucide-react";

export default function UserProgress() {
  const [progressData, setProgressData] = useState([
    { date: "2026-01-01", weight: 80, muscle: 30 },
    { date: "2026-01-08", weight: 79, muscle: 31 },
    { date: "2026-01-15", weight: 78, muscle: 32 },
    { date: "2026-01-22", weight: 77.5, muscle: 33 },
    { date: "2026-01-29", weight: 77, muscle: 34 },
  ]);

  const [weight, setWeight] = useState("");
  const [muscle, setMuscle] = useState("");
  const [date, setDate] = useState("");

  const addProgress = () => {
    if (!weight || !muscle || !date) return;
    setProgressData(prev => [...prev, { date, weight: parseFloat(weight), muscle: parseFloat(muscle) }]);
    setWeight("");
    setMuscle("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#11162a] rounded-2xl p-6 flex items-center gap-3">
          <Dumbbell className="text-purple-500" />
          <div>
            <h1 className="text-2xl font-bold">Progress Tracker</h1>
            <p className="text-sm text-gray-400">Monitor your weight and muscle growth monthly</p>
          </div>
        </div>

        <div className="bg-[#11162a] rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Add Monthly Progress</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="month"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
            />
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
            />
            <input
              type="number"
              value={muscle}
              onChange={e => setMuscle(e.target.value)}
              placeholder="Muscle (%)"
              className="flex-1 bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm"
            />
            <button
              onClick={addProgress}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-semibold"
            >
              Add Progress
            </button>
          </div>

          <h2 className="text-lg font-semibold">Monthly Progress</h2>
          <div className="overflow-x-auto">
            <BarChart data={progressData} width={800} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="weight" fill="#7c3aed" />
              <Bar dataKey="muscle" fill="#4f46e5" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
