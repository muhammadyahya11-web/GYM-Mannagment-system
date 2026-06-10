import React, { useState, useEffect } from "react";

export default function Attendance() {
  const initialMembers = [
    { id: 1, name: "Ali Khan", whatsapp: "03001234567", plan: "Basic" },
    { id: 2, name: "Sara Ahmed", whatsapp: "03111234567", plan: "Standard" },
    { id: 3, name: "Hamza Iqbal", whatsapp: "03221234567", plan: "Premium" },
    { id: 4, name: "Ayesha Khan", whatsapp: "03331234567", plan: "Standard" },
  ];

  const [members, setMembers] = useState(initialMembers);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceHistory, setAttendanceHistory] = useState({});
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");
  const [modalMember, setModalMember] = useState(null);

  // Initialize today's attendance if not exists
  useEffect(() => {
    if (!attendanceHistory[date]) {
      setAttendanceHistory(prev => ({
        ...prev,
        [date]: members.map(m => ({ ...m, present: false }))
      }));
    }
  }, [date, members, attendanceHistory]);

  const toggleAttendance = (id) => {
    setAttendanceHistory(prev => ({
      ...prev,
      [date]: prev[date].map(m => m.id === id ? { ...m, present: !m.present } : m)
    }));
  };

  const markAll = (status) => {
    setAttendanceHistory(prev => ({
      ...prev,
      [date]: prev[date].map(m => ({ ...m, present: status }))
    }));
  };

  const filteredMembers = attendanceHistory[date]
    ? attendanceHistory[date].filter(
        m =>
          (m.name.toLowerCase().includes(search.toLowerCase()) ||
           m.whatsapp.includes(search)) &&
          (filterPlan === "All" || m.plan === filterPlan)
      )
    : [];

  const uniquePlans = ["All", ...new Set(members.map(m => m.plan))];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <div className="flex gap-2 flex-wrap items-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
          />
          <input
            type="text"
            placeholder="Search by Name or WhatsApp"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
          />
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
          >
            {uniquePlans.map(plan => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
          <button
            onClick={() => markAll(true)}
            className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg font-semibold"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll(false)}
            className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-[#111827]">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">WhatsApp</th>
              <th className="py-3 px-6">Plan</th>
              <th className="py-3 px-6">Attendance</th>
              <th className="py-3 px-6">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{member.name}</td>
                <td className="py-3 px-6">{member.whatsapp}</td>
                <td className="py-3 px-6">{member.plan}</td>
                <td className="py-3 px-6">
                  <span
                    onClick={() => toggleAttendance(member.id)}
                    className={`cursor-pointer py-1 px-3 rounded-full font-semibold ${
                      member.present ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {member.present ? "Present" : "Absent"}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => setModalMember(member)}
                    className="bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded-lg font-semibold"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attendance Summary */}
      {attendanceHistory[date] && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg">Total Members</h2>
            <p className="text-2xl font-bold">{attendanceHistory[date].length}</p>
          </div>
          <div className="bg-green-800 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg">Present</h2>
            <p className="text-2xl font-bold">{attendanceHistory[date].filter(m => m.present).length}</p>
          </div>
          <div className="bg-red-800 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg">Absent</h2>
            <p className="text-2xl font-bold">{attendanceHistory[date].filter(m => !m.present).length}</p>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {modalMember && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#111827] rounded-xl p-6 w-11/12 md:w-1/3 relative">
            <button
              onClick={() => setModalMember(null)}
              className="absolute top-3 right-3 text-red-500 font-bold text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Member Details</h2>
            <p><span className="font-semibold">Name:</span> {modalMember.name}</p>
            <p><span className="font-semibold">WhatsApp:</span> {modalMember.whatsapp}</p>
            <p><span className="font-semibold">Plan:</span> {modalMember.plan}</p>
            <p><span className="font-semibold">Attendance:</span> {attendanceHistory[date].find(m => m.id === modalMember.id).present ? "Present" : "Absent"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
