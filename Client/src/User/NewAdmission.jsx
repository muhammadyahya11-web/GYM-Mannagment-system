import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function NewAdmission() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    whatsapp: "",
    address: "",
    joiningDate: "",
    admissionFee: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addStudent = () => {
    const { name, age, weight, whatsapp, address, joiningDate, admissionFee } = formData;
    if (!name || !age || !weight || !whatsapp || !address || !joiningDate || !admissionFee) return;
    setStudents(prev => [...prev, { id: prev.length + 1, ...formData }]);
    setFormData({ name: "", age: "", weight: "", whatsapp: "", address: "", joiningDate: "", admissionFee: "" });
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#11162a] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <UserPlus className="text-purple-500 w-10 h-10" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">New Admission</h1>
            <p className="text-gray-400 text-sm">Register and manage new gym members efficiently</p>
          </div>
        </div>

        <div className="bg-[#11162a] rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold">Add New Member</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Full Name" className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <input name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <input name="whatsapp" type="text" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp Number" className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <input name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Address" className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <input name="joiningDate" type="date" value={formData.joiningDate} onChange={handleChange} className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <input name="admissionFee" type="number" value={formData.admissionFee} onChange={handleChange} placeholder="Admission Fee ($)" className="bg-[#0b0f1a] border border-white/20 px-4 py-2 rounded-xl text-sm focus:border-purple-500 focus:outline-none" />
            <button onClick={addStudent} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-semibold col-span-full mt-2 sm:col-span-1">Add Member</button>
          </div>

          <h2 className="text-lg font-semibold">Members List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {students.map(s => (
              <div key={s.id} className="flex flex-col p-4 bg-[#0e1424] rounded-xl hover:bg-[#1a1f3a] transition">
                <span className="font-medium text-white text-sm">{s.name}</span>
                <div className="flex flex-wrap justify-between text-gray-400 text-xs mt-1 gap-2">
                  <span>Age: {s.age}</span>
                  <span>Weight: {s.weight} kg</span>
                  <span>WhatsApp: {s.whatsapp}</span>
                  <span>Address: {s.address}</span>
                  <span>Joined: {s.joiningDate}</span>
                  <span>Fee: ${s.admissionFee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}