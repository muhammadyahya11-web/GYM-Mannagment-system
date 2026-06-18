import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import baseAPI from "../../Config/Baseapi";
import { MainContext } from "../../Maincontext/Context";

export default function MonthlyRepost() {
  const { token } = useContext(MainContext);
  const [report, setReport] = useState({
    totalRevenue: 0,
    activeMembers: 0,
    newMembers: 0,
    pendingPayments: 0,
    recentPayments: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await Axios.get(`${baseAPI}/api/payment/monthly-report`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReport(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [token]);
  return (
    <div className="min-h-screen bg-[#0b0f1a] p-6 text-white">
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
          <select className="bg-transparent text-sm outline-none">
            <option>September 2025</option>
            <option>August 2025</option>
            <option>July 2025</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <KpiCard title="Total Revenue" value={`Rs ${report.totalRevenue?.toLocaleString() || 0}`} />
        <KpiCard title="Active Members" value={report.activeMembers || 0} />
        <KpiCard title="New Members" value={report.newMembers || 0} />
        <KpiCard title="Pending Payments" value={`Rs ${report.pendingPayments?.toLocaleString() || 0}`} />
      </div>

      <div className="bg-[#141c2f] rounded-2xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-[#1b2440]">
          <h2 className="text-lg font-semibold">Payment Breakdown</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1b2440] text-gray-300">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Member</th>
                <th className="px-5 py-3 text-left font-medium">Plan</th>
                <th className="px-5 py-3 text-left font-medium">Amount</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-left font-medium">Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="p-4 text-gray-400" colSpan="5">Loading...</td>
                </tr>
              ) : report.recentPayments?.length > 0 ? (
                report.recentPayments.map((p) => (
                  <TableRow
                    key={p._id}
                    name={p.memberName}
                    plan={p.membershipPlan}
                    amount={`Rs ${p.amount}`}
                    status={p.status}
                    date={p.date}
                  />
                ))
              ) : (
                <tr>
                  <td className="p-4 text-gray-400" colSpan="5">No payments this month</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-[#141c2f] p-5 rounded-2xl">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
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
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-5 py-4 text-gray-400">{date}</td>
    </tr>
  );
}