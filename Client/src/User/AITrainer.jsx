import { Bot, Send, Dumbbell, Flame, Apple, Activity } from "lucide-react";
import { useState } from "react";

export default function AITrainer() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      from: "ai",
      text: "Welcome to FitPro AI Trainer 🤖💪. I can create workouts, diet plans, and fat‑loss strategies tailored just for you. Ask anything!",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat(prev => [
      ...prev,
      { from: "user", text: message },
      {
        from: "ai",
        text: "Got it! Stay consistent, train smart, and focus on recovery. I’ll guide you step by step 💯",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-black/20 p-3 rounded-xl">
              <Bot size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Trainer</h1>
              <p className="text-sm text-indigo-200">Your 24/7 smart fitness coach</p>
            </div>
          </div>
          <span className="text-xs bg-black/30 px-3 py-1 rounded-full">Powered by AI</span>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Capability icon={<Dumbbell />} title="Workout Plans" />
          <Capability icon={<Apple />} title="Diet Guidance" />
          <Capability icon={<Flame />} title="Fat Loss" />
          <Capability icon={<Activity />} title="Progress Tips" />
        </div>

        {/* Chat Section */}
        <div className="bg-[#11162a] rounded-2xl shadow-xl flex flex-col h-[480px]">
          {/* Chat Header */}
          <div className="border-b border-white/10 p-4 flex items-center gap-3">
            <Bot className="text-purple-500" />
            <p className="text-sm text-gray-400">AI Trainer Assistant</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  c.from === "ai"
                    ? "bg-purple-600 text-white self-start"
                    : "bg-[#0b0f1a] border border-white/10 self-end"
                }`}
              >
                {c.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4 flex gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about workout, diet, fat loss..."
              className="flex-1 bg-[#0b0f1a] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 px-5 rounded-xl hover:bg-purple-700 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Capability({ icon, title }) {
  return (
    <div className="bg-[#11162a] rounded-xl p-4 flex items-center gap-3">
      <div className="text-indigo-400">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
