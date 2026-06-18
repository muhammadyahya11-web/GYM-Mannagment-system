import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import { QrCode, CalendarCheck } from "lucide-react";
import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";

export default function Attendance() {
  const { token } = useContext(MainContext);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState({});
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");
  const [showQR, setShowQR] = useState(false);
  const [gymQRData, setGymQRData] = useState(null);

  // Fetch gym QR for display
  useEffect(() => {
    const fetchQR = async () => {
      if (token) {
        try {
          const res = await axios.get(`${baseAPI}/api/attendence/gym-qr`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setGymQRData(res.data);
        } catch (err) {
          console.log("Failed to fetch gym QR");
        }
      }
    };
    fetchQR();
  }, [token]);

  // ================= FETCH MEMBERS =================
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseAPI}/api/member/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(res.data.members || res.data);
      } catch (err) {
        toast.error("Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [token]);

  // Initialize attendance state
  useEffect(() => {
    if (members.length > 0) {
      const initialAttendance = {};
      members.forEach((m) => {
        initialAttendance[m._id || m.id] = false;
      });
      setAttendance(initialAttendance);
    }
  }, [members, date]);

  // ================= TOGGLE ATTENDANCE =================
  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const markAll = (status) => {
    const newAttendance = {};
    members.forEach((m) => {
      newAttendance[m._id || m.id] = status;
    });
    setAttendance(newAttendance);
  };

  // ================= SAVE ATTENDANCE =================
  const saveAttendance = async () => {
    try {
      setLoading(true);

      for (const member of members) {
        const memberId = member._id || member.id;
        const present = attendance[memberId];

        await axios.post(
          `${baseAPI}/api/attendence/create`,
          { memberId, attendance: present ? "Present" : "Absent" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toast.success("Attendance saved successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTERED MEMBERS =================
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      (m.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.whatsapp || "").includes(search);
    const matchesPlan = filterPlan === "All" || m.subscribePlan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const uniquePlans = ["All", ...new Set(members.map((m) => m.subscribePlan))];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
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
            {uniquePlans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
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
          <button
            onClick={() => setShowQR(true)}
            className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg font-semibold flex items-center gap-2"
          >
            <QrCode size={18} />
            Show QR Code
          </button>
          <button
            onClick={saveAttendance}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : "Save Attendance"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-[#111827]">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">WhatsApp</th>
              <th className="py-3 px-6">Plan</th>
              <th className="py-3 px-6">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={member._id || member.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{member.name}</td>
                <td className="py-3 px-6">{member.whatsapp || member.phone}</td>
                <td className="py-3 px-6">{member.subscribePlan || member.plan}</td>
                <td className="py-3 px-6">
                  <span
                    onClick={() => toggleAttendance(member._id || member.id)}
                    className={`cursor-pointer py-1 px-3 rounded-full font-semibold ${
                      attendance[member._id || member.id]
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {attendance[member._id || member.id] ? "Present" : "Absent"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {members.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg">Total Members</h2>
            <p className="text-2xl font-bold">{filteredMembers.length}</p>
          </div>
          <div className="bg-green-800 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg">Present</h2>
            <p className="text-2xl font-bold">
              {Object.values(attendance).filter(Boolean).length}
            </p>
          </div>
          <div className="bg-red-800 p-4 rounded-lg text-center">
            <h2 className="font-semibold text-lg">Absent</h2>
            <p className="text-2xl font-bold">
              {filteredMembers.length - Object.values(attendance).filter(Boolean).length}
            </p>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#111827] rounded-xl p-8 w-11/12 md:w-1/3 relative flex flex-col items-center">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 text-red-500 font-bold text-xl"
            >
              ×
            </button>
            <CalendarCheck size={40} className="text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Daily Gym QR Code</h2>
            <p className="text-gray-400 mb-6 text-center">
              Members scan this QR code at the gym entrance to mark their attendance
            </p>
            <div className="bg-white p-4 rounded-lg mb-4">
              {gymQRData ? (
                <QRCode value={gymQRData.qrData} size={200} />
              ) : (
                <p className="text-gray-500">Generating QR...</p>
              )}
            </div>
            <p className="text-sm text-gray-400">Gym Attendance QR - {gymQRData?.date || date}</p>
          </div>
        </div>
      )}
    </div>
  );
}