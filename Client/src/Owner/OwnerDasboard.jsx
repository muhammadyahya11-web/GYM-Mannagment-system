import { useState, useEffect, useContext } from "react";
import { Bell, Search, Users, Dumbbell, CreditCard, CalendarCheck, ChevronRight, Menu } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import { MainContext } from "../Maincontext/Context";
import Axios from "axios";
import baseAPI from "../Config/Baseapi";

export default function OwnerDashboard() {
  const { token } = useContext(MainContext);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeTrainers: 0,
    todayAttendance: 0,
    monthlyRevenue: 0
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await Axios.get(`${baseAPI}/api/payment/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setStats({
            totalMembers: res.data.totalMembers,
            activeTrainers: res.data.activeTrainers,
            todayAttendance: res.data.todayAttendance,
            monthlyRevenue: res.data.monthlyRevenue
          });
          setRecentPayments(res.data.recentPayments || []);
        }
      } catch (err) {
        console.log("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [token]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f1a] w-full text-white flex flex-col md:flex-row">
      {/* Mobile Hamburger */}
      <div className="flex md:hidden justify-between items-center p-4 bg-[#0e1424]">
        <h1 className="font-bold text-lg">FitPro Gym</h1>
        <button onClick={() => setMobileSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="min-w-full bg-black/50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="p-4 md:p-8 space-y-6 w-full">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center px-4 py-2 rounded-xl w-full md:w-96 bg-[#11162a]">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              placeholder="Search members"
              className="bg-transparent ml-2 outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">Gym Owner</span>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-purple-600 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Welcome Back, Coach!</h2>
            <p className="text-sm text-indigo-200 mt-1">
              Manage your gym members, trainers & schedules
            </p>
            <div className="flex gap-3 mt-4 flex-wrap">
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm">
                Add Member
              </button>
              <button className="border border-white/40 px-4 py-2 rounded-lg text-sm">
                View Reports
              </button>
            </div>
          </div>
          <div className="w-32 h-32 bg-black/20 rounded-xl" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#11162a] rounded-xl p-4 space-y-2">
            <Users className="text-indigo-400" />
            <p className="text-sm text-gray-400">Total Members</p>
            <h3 className="text-2xl font-bold">{stats.totalMembers}</h3>
          </div>
          <div className="bg-[#11162a] rounded-xl p-4 space-y-2">
            <Dumbbell className="text-indigo-400" />
            <p className="text-sm text-gray-400">Active Trainers</p>
            <h3 className="text-2xl font-bold">{stats.activeTrainers}</h3>
          </div>
          <div className="bg-[#11162a] rounded-xl p-4 space-y-2">
            <CalendarCheck className="text-indigo-400" />
            <p className="text-sm text-gray-400">Today's Attendance</p>
            <h3 className="text-2xl font-bold">{stats.todayAttendance}</h3>
          </div>
          <div className="bg-[#11162a] rounded-xl p-4 space-y-2">
            <CreditCard className="text-indigo-400" />
            <p className="text-sm text-gray-400">Monthly Revenue</p>
            <h3 className="text-2xl font-bold">PKR {stats.monthlyRevenue}</h3>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#11162a] rounded-xl p-6">
            <h3 className="text-sm mb-4">Attendance Overview</h3>
            <div className="h-40 bg-black/20 rounded flex items-center justify-center">
              <p className="text-gray-400">Weekly attendance chart coming soon</p>
            </div>
          </div>

          <div className="bg-[#11162a] rounded-xl p-6 space-y-4">
            <h3 className="text-sm">Recent Payments</h3>
            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : recentPayments.length > 0 ? (
              recentPayments.map((p) => (
                <div
                  key={p._id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{p.memberName}</span>
                  <span className="text-green-400">PKR {p.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No recent payments</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}