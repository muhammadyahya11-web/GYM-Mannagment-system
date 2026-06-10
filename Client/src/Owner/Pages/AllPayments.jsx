// src/Owner/Pages/AllPayments.jsx
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Search, DollarSign } from "lucide-react";

export default function AllPayments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all payments from backend API
//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         // const res = await axios.get("http://localhost:8000/api/payments"); // your API endpoint
//         setPayments(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPayments();
//   }, []);

  // Filter payments based on search
  const filteredPayments = payments.filter(
    (p) =>
      p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>

      <div className="mb-4 flex items-center gap-2">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by member or membership type"
          className="p-2 rounded border border-gray-300 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Member Name</th>
              <th className="p-3 border-b">Membership Type</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Payment Date</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{payment.memberName}</td>
                  <td className="p-3 border-b">{payment.membershipType}</td>
                  <td className="p-3 border-b flex items-center gap-1">
                    <DollarSign size={16} /> {payment.amount}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        payment.status === "Paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
