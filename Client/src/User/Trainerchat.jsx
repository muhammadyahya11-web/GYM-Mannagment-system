import { useState } from "react";
import { Send, Dumbbell } from "lucide-react";

export default function TrainerChat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    { role: "trainer", text: "Hi! I'm your personal trainer 💪 How can I help you today?" },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setChats([...chats, { role: "user", text: message }]);
    setMessage("");

    setTimeout(() => {
      setChats((prev) => [...prev, { role: "trainer", text: "Great question! I'll prepare a plan for you." }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center gap-3">
        <Dumbbell className="w-6 h-6" />
        <div>
          <h2 className="font-semibold">Trainer Chat</h2>
          <p className="text-xs text-indigo-200">Live AI Fitness Coach</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm ${
              chat.role === "user"
                ? "bg-indigo-600 ml-auto"
                : "bg-[#11162a]"
            }`}
          >
            {chat.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-[#0e1424] flex items-center gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your trainer..."
          className="flex-1 bg-[#11162a] rounded-xl px-4 py-2 outline-none text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-xl"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
