import { useState } from "react";
import QRCode from "react-qr-code";
import { CalendarCheck } from "lucide-react";

export default function UserAttendanceQRCode() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { date: "2026-01-01", status: "Present" },
    { date: "2026-01-02", status: "Absent" },
    { date: "2026-01-03", status: "Present" },
  ]);

  const [scannedToday, setScannedToday] = useState(false);

  const handleScan = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!scannedToday) {
      setAttendanceRecords([...attendanceRecords, { date: today, status: "Present" }]);
      setScannedToday(true);
      alert("Attendance recorded for today!");
    } else {
      alert("You have already scanned today.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <div className="bg-[#11162a] rounded-2xl p-6 flex items-center gap-3 mb-6">
        <CalendarCheck className="text-purple-500" />
        <div>
          <h1 className="text-2xl font-bold">Attendance via QR Code</h1>
          <p className="text-sm text-gray-400">Scan the QR code to mark your attendance</p>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-[#11162a] p-6 rounded-2xl flex flex-col items-center gap-4 mb-6">
        <QRCode value="user-unique-id" size={180} className="bg-white p-2 rounded-lg" />
        <button
          onClick={handleScan}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-semibold"
        >
          Scan QR Code
        </button>
        {scannedToday && <p className="text-green-400 mt-2">✅ Attendance Recorded</p>}
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
              {attendanceRecords.map((record, idx) => (
                <tr key={idx} className={`border-b border-white/10 ${record.status === "Absent" ? "bg-red-600/10" : "bg-green-600/10"}`}>
                  <td className="px-4 py-2">{record.date}</td>
                  <td className="px-4 py-2">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
