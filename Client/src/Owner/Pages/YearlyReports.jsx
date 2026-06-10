import {
  BarChart3,
  Users,
  CreditCard,
  AlertCircle,
  Calendar,
} from "lucide-react";

export default function YearlyReports() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Yearly Reports
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Annual performance & financial summary
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#141c2f] px-4 py-2 rounded-lg">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <select className="bg-transparent text-sm outline-none">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KpiCard
          title="Total Revenue"
          value="Rs 1,150,000"
          icon={CreditCard}
          accent="text-green-400"
        />
        <KpiCard
          title="Total Members"
          value="480"
          icon={Users}
          accent="text-indigo-400"
        />
        <KpiCard
          title="New Members"
          value="210"
          icon={Users}
          accent="text-blue-400"
        />
        <KpiCard
          title="Pending Payments"
          value="Rs 85,000"
          icon={AlertCircle}
          accent="text-red-400"
        />
      </div>

      {/* YEAR SUMMARY */}
      <div className="bg-[#141c2f] rounded-2xl shadow-lg mb-8">
        <div className="px-6 py-4 border-b border-[#1b2440] flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold">Year Summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <SummaryItem title="Best Month" value="March" />
          <SummaryItem title="Highest Revenue" value="Rs 145,000" />
          <SummaryItem title="Lowest Revenue" value="Rs 72,000" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#141c2f] rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-[#1b2440]">
          <h2 className="text-lg font-semibold">Monthly Breakdown</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1b2440] text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Month</th>
                <th className="px-6 py-3 text-left font-medium">Members Joined</th>
                <th className="px-6 py-3 text-left font-medium">Revenue</th>
                <th className="px-6 py-3 text-left font-medium">Pending</th>
              </tr>
            </thead>

            <tbody>
              <YearRow month="January" members="32" revenue="Rs 85,000" pending="Rs 6,000" />
              <YearRow month="February" members="28" revenue="Rs 78,000" pending="Rs 4,500" />
              <YearRow month="March" members="45" revenue="Rs 145,000" pending="Rs 8,000" />
              <YearRow month="April" members="38" revenue="Rs 110,000" pending="Rs 7,200" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function KpiCard({ title, value, icon: Icon, accent }) {
  return (
    <div className="bg-[#141c2f] p-5 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-[#1b2440] ${accent}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

function SummaryItem({ title, value }) {
  return (
    <div className="bg-[#0b0f1a] rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-xl font-semibold mt-1">{value}</h3>
    </div>
  );
}

function YearRow({ month, members, revenue, pending }) {
  return (
    <tr className="border-b border-[#1b2440] last:border-none">
      <td className="px-6 py-4">{month}</td>
      <td className="px-6 py-4">{members}</td>
      <td className="px-6 py-4">{revenue}</td>
      <td className="px-6 py-4 text-red-400">{pending}</td>
    </tr>
  );
}
