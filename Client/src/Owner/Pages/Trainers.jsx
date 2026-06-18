import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";
import { toast } from "react-toastify";

export default function Trainers() {
  const nav = useNavigate();
  const { token } = useContext(MainContext);

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= GET TRAINERS =================
  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${baseAPI}/api/trainer/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      

      setTrainers(res.data.trainers || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTrainers();
  }, [token]);

  // ================= DELETE (OPTIONAL) =================
  const deleteTrainer = async (id) => {
    try {
      await axios.delete(`${baseAPI}/api/trainer/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Trainer deleted");
      setTrainers(trainers.filter((t) => t._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };
  // ===============================================

   const updateTrainerhandle =async (id)=>{
    nav(`/owner/addtrainer/${id}`);
   }

  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Trainers Management</h1>

        <button
          onClick={() => nav("/owner/addtrainer")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Trainer
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading trainers...</p>
      ) : (
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
                <tr
                  key={trainer._id}
                  className="border-t border-gray-700 hover:bg-[#1f2937]"
                >
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
                        trainer.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {trainer.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 flex justify-center gap-3">
                    <button  onClick={() => updateTrainerhandle(trainer._id)} className="text-yellow-400 hover:text-yellow-300">
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => deleteTrainer(trainer._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {trainers.length === 0 && (
            <p className="p-4 text-gray-400">No trainers found</p>
          )}
        </div>
      )}
    </div>
  );
}