import {
  TrendingUp,
  Users,
  CreditCard,
  AlertCircle,
  Calendar,
} from "lucide-react";

export default function MonthlyRepost() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Monthly Reports
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Financial & member activity overview
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#141c2f] px-4 py-2 rounded-lg">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <select className="bg-transparent text-sm outline-none">
            <option>September 2025</option>
            <option>August 2025</option>
            <option>July 2025</option>
          </select>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KpiCard
          title="Total Revenue"
          value="Rs 95,000"
          icon={TrendingUp}
          accent="text-green-400"
        />
        <KpiCard
          title="Active Members"
          value="120"
          icon={Users}
          accent="text-indigo-400"
        />
        <KpiCard
          title="New Members"
          value="18"
          icon={Users}
          accent="text-blue-400"
        />
        <KpiCard
          title="Pending Payments"
          value="Rs 12,000"
          icon={AlertCircle}
          accent="text-red-400"
        />
      </div>

      {/* TABLE */}
      <div className="bg-[#141c2f] rounded-2xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-[#1b2440]">
          <h2 className="text-lg font-semibold">Payment Breakdown</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1b2440] text-gray-300">
              <tr>
                <th className="px-5 py-3 text-left font-medium">
                  Member
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Plan
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Amount
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Status
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <TableRow
                name="Ali Khan"
                plan="Gold"
                amount="Rs 5,000"
                status="Paid"
                date="05 Sep 2025"
              />
              <TableRow
                name="Ahmed Raza"
                plan="Silver"
                amount="Rs 3,000"
                status="Pending"
                date="10 Sep 2025"
              />
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
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl bg-[#1b2440] ${accent}`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}

function TableRow({ name, plan, amount, status, date }) {
  return (
    <tr className="border-b border-[#1b2440] last:border-none">
      <td className="px-5 py-4">{name}</td>
      <td className="px-5 py-4">{plan}</td>
      <td className="px-5 py-4">{amount}</td>
      <td className="px-5 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Paid"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-5 py-4 text-gray-400">{date}</td>
    </tr>
  );
}
