import { useState } from "react";
import { Plus, Edit, Trash2, Phone, User } from "lucide-react";

export default function Trainers() {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Ali Khan",
      specialization: "Weight Training",
      experience: "5 Years",
      phone: "0301-1234567",
      status: "Active",
    },
    {
      id: 2,
      name: "Usman Ahmed",
      specialization: "Cardio & Fat Loss",
      experience: "3 Years",
      phone: "0322-9876543",
      status: "Inactive",
    },
  ]);

  const deleteTrainer = (id) => {
    setTrainers(trainers.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Trainers Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          <Plus size={18} /> Add Trainer
        </button>
      </div>

      {/* Trainers Table */}
      <div className="overflow-x-auto bg-[#111827] rounded-xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-[#1f2937] text-gray-300">
            <tr>
              <th className="p-4">Trainer</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="border-t border-gray-700 hover:bg-[#1f2937]">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <User />
                  </div>
                  {trainer.name}
                </td>
                <td className="p-4">{trainer.specialization}</td>
                <td className="p-4">{trainer.experience}</td>
                <td className="p-4 flex items-center gap-2">
                  <Phone size={16} /> {trainer.phone}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      trainer.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {trainer.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="text-yellow-400 hover:text-yellow-300">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteTrainer(trainer.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
