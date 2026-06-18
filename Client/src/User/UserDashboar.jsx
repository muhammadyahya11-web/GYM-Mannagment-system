import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import {
  Dumbbell,
  CalendarCheck,
  CreditCard,
  User,
  Clock,
  Flame,
  Activity,
  Trophy,
  Target,
  Bell,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { MainContext } from "../Maincontext/Context";
import baseAPI from "../Config/Baseapi";

export default function UserDashboard() {
  const { token } = useContext(MainContext);

  const [loading, setLoading] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [notifications] = useState([
    "Membership expires in 8 days",
    "New workout plan added by trainer",
    "Payment received successfully",
  ]);

  const [stats, setStats] = useState({
    name: "User",
    membership: "N/A",
    expiry: "N/A",
    dueAmount: 0,
    attendanceThisMonth: 0,
    streak: 0,
    calories: 0,
    goalProgress: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;
      setLoading(true);

      try {
        const userRes = await Axios.get(`${baseAPI}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const attendanceRes = await Axios.get(
          `${baseAPI}/api/attendence/my-attendance`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const paymentsRes = await Axios.get(
          `${baseAPI}/api/payment/my-payments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = userRes.data?.user;

        setAttendanceRecords(attendanceRes.data?.attendance || []);

        const attendance = attendanceRes.data?.attendance || [];

        setStats({
          name: user?.name || "User",
          membership: user?.subscribePlan || "N/A",
          expiry: user?.expiry || "N/A",
          dueAmount:
            paymentsRes.data?.payments?.find((p) => p.status === "Pending")
              ?.amount || 0,
          attendanceThisMonth: attendance.length,
          streak: calculateStreak(attendance),
          calories: attendance.length * 320,
          goalProgress: Math.min(attendance.length * 5, 100),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  const calculateStreak = (attendance) => {
    if (!attendance.length) return 0;
    return Math.min(attendance.length, 30);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">👋 Welcome {stats.name}</h1>
            <p className="text-gray-400 text-sm">
              Let’s crush your fitness goals today
            </p>
          </div>

          <div className="px-5 py-2 bg-purple-600 rounded-xl font-semibold">
            {stats.membership}
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Attendance"
            value={stats.attendanceThisMonth}
            icon={<CalendarCheck />}
          />

          <StatCard
            title="Streak"
            value={`${stats.streak} Days`}
            icon={<Flame />}
          />

          <StatCard
            title="Calories"
            value={`${stats.calories}`}
            icon={<Activity />}
          />

          <StatCard
            title="Due Amount"
            value={`PKR ${stats.dueAmount}`}
            icon={<CreditCard />}
          />
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* GOAL PROGRESS */}
          <Card title="Goal Progress" icon={<Target />}>
            <p className="text-sm text-gray-400 mb-2">
              Fat Loss Progress
            </p>

            <div className="w-full h-3 bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${stats.goalProgress}%` }}
              />
            </div>

            <p className="text-sm mt-2 text-gray-300">
              {stats.goalProgress}% Completed
            </p>
          </Card>

          {/* NOTIFICATIONS */}
          <Card title="Notifications" icon={<Bell />}>
            <ul className="space-y-2 text-sm text-gray-300">
              {notifications.map((n, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <CheckCircle2 size={14} className="text-green-400" />
                  {n}
                </li>
              ))}
            </ul>
          </Card>

          {/* MEMBERSHIP */}
          <Card title="Membership" icon={<Trophy />}>
            <p className="text-gray-400 text-sm">Expiry Date</p>
            <h2 className="text-lg font-bold">{stats.expiry}</h2>

            <p className="mt-2 text-sm text-gray-400">
              Status:{" "}
              <span className="text-green-400 font-semibold">
                Active
              </span>
            </p>

            <button className="mt-4 w-full bg-purple-600 py-2 rounded-xl hover:bg-purple-700">
              Renew Plan
            </button>
          </Card>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <QuickAction icon={<Dumbbell />} label="Workout" />
          <QuickAction icon={<User />} label="Profile" />
          <QuickAction icon={<Clock />} label="Attendance" />
          <QuickAction icon={<Zap />} label="AI Coach" />

        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition">
      <div className="text-purple-400">{icon}</div>
      <p className="text-gray-400 text-sm mt-2">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3 text-purple-400">
        {icon}
        <h2 className="font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function QuickAction({ icon, label }) {
  return (
    <button className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-purple-600/20 transition flex flex-col items-center gap-2">
      <div className="text-purple-400">{icon}</div>
      <span className="text-sm">{label}</span>
    </button>
  );
}