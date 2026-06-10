import React, { useState } from "react";

export default function Members() {
  const [members, setMembers] = useState([
    { id: 1, name: "Ali Khan", whatsapp: "03001234567", plan: "Basic", startDate: "2025-12-01" },
    { id: 2, name: "Sara Ahmed", whatsapp: "03111234567", plan: "Standard", startDate: "2025-11-15" },
    { id: 3, name: "Hamza Iqbal", whatsapp: "03221234567", plan: "Premium", startDate: "2025-10-20" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: "", whatsapp: "", plan: "", startDate: "" });

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({ name: "", whatsapp: "", plan: "", startDate: "" });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? formData : m));
    } else {
      const newMember = { ...formData, id: members.length ? members[members.length - 1].id + 1 : 1 };
      setMembers([...members, newMember]);
    }
    setModalOpen(false);
  };

  const deleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gym Members</h1>
        <button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg font-semibold"
        >
          + Add Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#111827] rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">WhatsApp</th>
              <th className="py-3 px-6">Plan</th>
              <th className="py-3 px-6">Start Date</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{member.name}</td>
                <td className="py-3 px-6">{member.whatsapp}</td>
                <td className="py-3 px-6">{member.plan}</td>
                <td className="py-3 px-6">{member.startDate}</td>
                <td className="py-3 px-6 flex gap-2">
                  <button
                    onClick={() => openModal(member)}
                    className="bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#111827] rounded-xl p-6 w-11/12 md:w-1/2 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-red-500 font-bold text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{editingMember ? "Edit Member" : "Add Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Membership Plan"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                required
              />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg font-semibold w-full"
              >
                {editingMember ? "Update Member" : "Add Member"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
