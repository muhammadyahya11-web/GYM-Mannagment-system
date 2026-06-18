import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { MainContext } from "../../Maincontext/Context";
import baseAPI from "../../Config/Baseapi";
import { Search, DollarSign, CreditCard, CheckCircle, XCircle } from "lucide-react";

export default function AllPayments() {
  const { token } = useContext(MainContext);

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH PAYMENTS =================
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await Axios.get(`${baseAPI}/api/payment/gym-payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPayments(res.data.payments || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPayments();
  }, [token]);

  // ================= FILTER =================
  const filtered = payments.filter((p) =>
    (p.memberName || "").toLowerCase().includes(search.toLowerCase())
  );

  // ================= STATS =================
  const totalIncome = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const cashPayments = payments.filter((p) => (p.paymentMethod || p.method) === "Cash").length;
  const stripePayments = payments.filter((p) => (p.paymentMethod || p.method) === "Card").length;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Payments Dashboard</h1>

        <div className="flex items-center gap-3 bg-[#111827] px-4 py-2 rounded-lg border border-gray-700">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member..."
            className="bg-transparent outline-none text-white"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm">Total Income</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
           <span className="text-green-500">  PKR</span>
            {totalIncome}
          </h2>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm">Cash Payments</p>
          <h2 className="text-2xl font-bold">{cashPayments}</h2>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm">Stripe Payments</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="text-blue-500" />
            {stripePayments}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-[#111827] rounded-xl border border-gray-700">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-4">Member</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-gray-400" colSpan="6">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-400" colSpan="6">
                  No payments found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p._id} className="border-b border-gray-800 hover:bg-[#0f172a]">
                  <td className="p-4">{p.memberName}</td>
                  <td className="p-4">{p.membershipPlan}</td>
                  <td className="p-4 text-green-400">PKR {p.amount}</td>

<td className="p-4 capitalize">{p.paymentMethod || p.method}</td>
<td className="p-4">
                      {p.status === "Paid" ? (
                        <span className="flex items-center gap-1 text-green-500">
                          <CheckCircle size={16} /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-500">
                          <XCircle size={16} /> Pending
                        </span>
                      )}
                    </td>

                  <td className="p-4 text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}