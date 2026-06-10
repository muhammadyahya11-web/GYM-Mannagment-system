import { Dumbbell, CalendarCheck, CreditCard, User, Clock } from "lucide-react";

export default function UserDashboard() {
  const user = {
    name: "Muhammad Yahya",
    membership: "Premium",
    expiry: "15 March 2026",
    attendanceThisMonth: 18,
    totalSessions: 124,
    dueAmount: 0,
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-[#11162a] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <p className="text-sm text-gray-400">Your personal gym dashboard</p>
          </div>
          <div className="bg-purple-600 px-6 py-3 rounded-xl font-semibold">
            {user.membership} Member
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Membership Expiry" value={user.expiry} icon={<CalendarCheck />} />
          <StatCard title="Attendance This Month" value={user.attendanceThisMonth} icon={<Clock />} />
          <StatCard title="Total Sessions" value={user.totalSessions} icon={<Dumbbell />} />
          <StatCard title="Due Amount" value={`PKR ${user.dueAmount}`} icon={<CreditCard />} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile */}
          <div className="bg-[#11162a] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Profile</h2>
            <div className="text-sm text-gray-400 space-y-1">
              <p><span className="text-white">Name:</span> {user.name}</p>
              <p><span className="text-white">Plan:</span> {user.membership}</p>
              <p><span className="text-white">Expiry:</span> {user.expiry}</p>
            </div>
            <button className="w-full border border-white/20 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-white/5">
              <User size={16} /> View Profile
            </button>
          </div>

          {/* Attendance */}
          <div className="bg-[#11162a] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Recent Attendance</h2>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>✔ 01 Jan 2026</li>
              <li>✔ 03 Jan 2026</li>
              <li>✔ 05 Jan 2026</li>
              <li>✔ 07 Jan 2026</li>
            </ul>
            <button className="w-full border border-white/20 rounded-lg py-2 hover:bg-white/5">
              View Full Attendance
            </button>
          </div>

          {/* Payments */}
          <div className="bg-[#11162a] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Payments</h2>
            <div className="text-sm text-gray-400">
              <p>Last Payment: PKR 12,000</p>
              <p>Status: Paid</p>
            </div>
            <button className="w-full bg-purple-600 rounded-lg py-2 font-semibold hover:bg-purple-700">
              View Payment History
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#11162a] rounded-xl p-4 space-y-2">
      <div className="text-indigo-400">{icon}</div>
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
