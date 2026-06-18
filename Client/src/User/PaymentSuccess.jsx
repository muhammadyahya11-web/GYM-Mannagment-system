import { useEffect } from "react";
import { CheckCircle, Sparkles } from "lucide-react";

export default function PaymentSuccess() {
  useEffect(() => {
    // Add confetti effect on mount
    const createConfetti = () => {
      const colors = ["#22c55e", "#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899"];
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
      }
    };
    
    createConfetti();
    
    // Auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center overflow-hidden">
      <style>{`
        .confetti {
          position: fixed;
          top: -10px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: fall linear infinite;
          z-index: 1000;
        }
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        .animate-pulse-scale {
          animation: pulseScale 2s ease-in-out infinite;
        }
        @keyframes pulseScale {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1); }
        }
      `}</style>
      
      <div className="text-center space-y-6 p-8">
        {/* Animated Check Circle */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-500/30 rounded-full animate-pulse-scale" />
          <CheckCircle 
            className="text-green-500 w-24 h-24 animate-bounce-slow" 
            strokeWidth={2}
          />
          {/* Sparkles animation */}
          <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-8 h-8 animate-spin" />
          <Sparkles className="absolute -bottom-4 -left-4 text-purple-400 w-6 h-6 animate-spin" style={{ animationDuration: "3s" }} />
        </div>

        {/* Success Text */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-400">
            Your membership has been renewed successfully
          </p>
        </div>

        {/* Animated Card */}
        <div className="bg-[#11162a] border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto transform transition-all duration-500 hover:scale-105">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400 font-semibold animate-pulse">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction</span>
              <span className="text-white font-mono text-sm">#PAY-{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Valid Until</span>
              <span className="text-white">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Auto-redirect notice */}
        <p className="text-sm text-gray-500">
          Redirecting to dashboard in 5 seconds...
        </p>

        {/* Continue Button */}
        <button
          onClick={() => window.location.href = "/"}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 
                     px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
}