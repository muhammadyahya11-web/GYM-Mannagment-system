import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CalendarCheck, QrCode, Camera } from "lucide-react";
import { MainContext } from "../Maincontext/Context.jsx";
import baseAPI from "../Config/Baseapi";

export default function UserAttendanceQRCode() {
  const { token } = useContext(MainContext);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [scannedToday, setScannedToday] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-scan when on the attendance page (for QR scan)
  useEffect(() => {
    const handleScan = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const res = await axios.get(`${baseAPI}/api/attendence/scan`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data.success) {
          setScannedToday(true);
          toast.success("Attendance recorded!");
        }
      } catch (err) {
        if (err.response?.status === 400) {
          setScannedToday(true);
          toast.info("Attendance already recorded today");
        } else {
          toast.error(err.response?.data?.message || "Failed to record attendance");
        }
      } finally {
        setLoading(false);
      }
    };

    // Auto-scan when on the attendance page directly (for QR scan)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("scan")) {
      handleScan();
    }
  }, [token]);

  // Fetch attendance history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${baseAPI}/api/attendence/my-attendance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendanceRecords(res.data.attendance || []);
      } catch (err) {
        console.log("Could not fetch history");
      }
    };
    if (token) fetchHistory();
  }, [token]);

  // QR Scanner mock - simulates scanning
  const handleScanQR = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const res = await axios.get(`${baseAPI}/api/attendence/scan`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.data.success) {
        setScannedToday(true);
        toast.success("Attendance recorded!");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setScannedToday(true);
        toast.info("Attendance already recorded today");
      } else {
        toast.error(err.response?.data?.message || "Failed to record attendance");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <div className="bg-[#11162a] rounded-2xl p-6 flex items-center gap-3 mb-6 w-full max-w-3xl">
        <CalendarCheck className="text-purple-500" />
        <div>
          <h1 className="text-2xl font-bold">Attendance</h1>
          <p className="text-sm text-gray-400">Scan QR at gym entrance to mark attendance</p>
        </div>
      </div>

      {/* QR Scan Section */}
      <div className="bg-[#11162a] rounded-xl p-6 w-full max-w-3xl mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <QrCode size={20} /> Mark Attendance
        </h2>
        
        {!scannedToday && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400 text-center">
              Scan QR code at the gym entrance to mark your attendance
            </p>
            <button
              onClick={handleScanQR}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 py-3 px-8 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <Camera size={18} />
              {loading ? "Recording..." : "Mark Attendance Now"}
            </button>
          </div>
        )}

        {scannedToday && (
          <div className="bg-green-600/20 p-4 rounded-lg text-center">
            <p className="text-green-400 font-semibold">✅ Attendance Recorded for Today</p>
            <p className="text-sm text-gray-400 mt-2">
              Thank you! Your attendance has been successfully marked.
            </p>
          </div>
        )}
      </div>

      {/* Attendance Table */}
      <div className="bg-[#11162a] rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record, idx) => (
                  <tr key={idx} className={`border-b border-white/10 ${record.attendance === "Absent" ? "bg-red-600/10" : "bg-green-600/10"}`}>
                    <td className="px-4 py-2">
                      {new Date(record.date).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-2">{record.attendance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-8 text-center text-gray-400">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}