import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Maincontext/Context";
import { toast } from "react-toastify";
import baseAPI from "../../Config/Baseapi";

export default function Members() {
  const nav = useNavigate();
  const { token } = useContext(MainContext);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ================= FETCH MEMBERS =================
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${baseAPI}/api/member/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(res.data.members || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMembers();
  }, [token]);

  // ================= DELETE MEMBER =================
  const deleteMember = async (id) => {
    try {
      await axios.delete(`${baseAPI}/api/member/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Member deleted");
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (member) => {
    setEditData(member);
    setEditOpen(true);
  };

  // ================= UPDATE MEMBER =================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(
        `${baseAPI}/api/member/update/${editData._id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Member updated");
      setEditOpen(false);
      fetchMembers();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER LOGIC =================
  const filteredMembers = members.filter((m) => {
    const matchSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.whatsapp?.includes(search);

    const matchStatus =
      statusFilter === "All" ? true : m.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gym Members</h1>

        <button
          onClick={() => nav("/owner/addmember")}
          className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg font-semibold"
        >
          + Add Member
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search name or whatsapp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-[#111827] border border-gray-700"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg bg-[#111827] border border-gray-700"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#111827] rounded-xl overflow-hidden">

          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">WhatsApp</th>
              <th className="py-3 px-6">Plan</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member, index) => (
              <tr
                key={member._id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{member.name}</td>
                <td className="py-3 px-6">{member.whatsapp}</td>
                <td className="py-3 px-6">{member.subscribePlan}</td>
                <td className="py-3 px-6">{member.status}</td>

                <td className="py-3 px-6 flex gap-2">
                  <button
                    onClick={() => openEdit(member)}
                    className="bg-blue-600 px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMember(member._id)}
                    className="bg-red-600 px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {filteredMembers.length === 0 && (
          <p className="text-gray-400 mt-4">No members found</p>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111827] p-6 rounded-2xl w-full md:w-1/2">

            <h2 className="text-2xl font-bold mb-4">Edit Member</h2>

            <div className="grid gap-4">

              <input
                className="p-3 bg-[#0b0f1a] border border-gray-700 rounded-lg"
                value={editData?.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />

              <input
                className="p-3 bg-[#0b0f1a] border border-gray-700 rounded-lg"
                value={editData?.whatsapp || ""}
                onChange={(e) =>
                  setEditData({ ...editData, whatsapp: e.target.value })
                }
              />

              <input
                className="p-3 bg-[#0b0f1a] border border-gray-700 rounded-lg"
                value={editData?.subscribePlan || ""}
                onChange={(e) =>
                  setEditData({ ...editData, subscribePlan: e.target.value })
                }
              />

              <select
                className="p-3 bg-[#0b0f1a] border border-gray-700 rounded-lg"
                value={editData?.status || "Active"}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Expired</option>
              </select>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 rounded-lg"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}