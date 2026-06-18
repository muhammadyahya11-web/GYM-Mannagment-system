import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import baseAPI from "../../Config/Baseapi";
import { MainContext } from "../../Maincontext/Context";
import { toast } from "react-toastify";
import { Clock, CheckCircle, XCircle, Search } from "lucide-react";

 function PendingPayments() {
  const { token } = useContext(MainContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await Axios.get(
        `${baseAPI}/api/payment/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(res.data.payments || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPayments();
  }, [token]);

  // ================= FILTER =================
  const filteredPayments = payments.filter((p) =>
    p.memberName?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search) ||
    p.membershipPlan?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= MARK PAID =================
  const markAsPaid = async (id) => {
    try {
      await Axios.put(
        `${baseAPI}/api/payment/mark-paid/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Payment marked as paid");
      fetchPayments();
    } catch (error) {
      toast.error("Failed to update payment");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold">Pending Payments</h1>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member..."
            className="bg-[#11162a] pl-10 pr-4 py-2 rounded-lg border border-gray-700 text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="min-w-full bg-[#11162a]">
          <thead>
            <tr className="text-left bg-[#0f1424] text-gray-300">
              <th className="p-3">Member</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p._id} className="border-t border-gray-800 hover:bg-[#0f1424]">
                
                <td className="p-3 font-medium">{p.memberName}</td>
                <td className="p-3 text-gray-300">{p.phone}</td>
                <td className="p-3">{p.membershipPlan}</td>
                <td className="p-3 text-green-400">PKR {p.amount}</td>

                <td className="p-3">
                  {p.status === "pending" ? (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Clock size={16} /> Pending
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-500">
                      <CheckCircle size={16} /> Paid
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {p.status === "pending" && (
                    <button
                      onClick={() => markAsPaid(p._id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm"
                    >
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayments.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No pending payments found
          </div>
        )}
      </div>

    </div>
  );
}

export default PendingPayments