import React, { useContext, useState } from "react";
import { Dumbbell, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../Maincontext/Context";

function Login() {
  const nav = useNavigate();
  const {settooken ,setUser } = useContext(MainContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= LOGIN HANDLER =================
  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
     console.log(formData);
     const res = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
        { withCredentials: true }
      );
    

      console.log("LOGIN SUCCESS:", res.data);
      settooken(res.data.token)
      localStorage.setItem("tooken", res.data.token)
      localStorage.setItem("user", res.data.user.role)
      setUser(res.data.user.role)
      if (user === "client") {
        nav("/user/dashboard");
      }
      if (user === "owner") {
        nav("/owner/dashboard");
      }
      if (user === "trainer") {
        nav("/trainer/dashboard");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white bg-[#0b0f1a]">
      <div className="bg-[#0e1424] p-6 rounded-2xl border-purple-600 border w-[360px] shadow-[0_20px_60px_rgba(147,51,234,0.35)]">
        <h1 className="text-xl font-bold flex gap-2 justify-center">
          Login <Dumbbell />
        </h1>

        {/* Google Login */}
        <div className="px-10 my-6 py-3 w-full rounded-xl bg-[#0b0f1a] text-center cursor-pointer hover:bg-[#11162a]">
          Login with Google
        </div>

        {/* OR */}
        <div className="flex items-center my-4 text-gray-400">
          <div className="flex-1 border-b" />
          <span className="mx-2 text-sm">OR</span>
          <div className="flex-1 border-b" />
        </div>

        {/* FORM */}
        <form onSubmit={loginHandler} className="flex gap-3 flex-col">
          <input
            type="email"
            placeholder="Email"
            className="pl-5 pr-5 py-3 rounded-xl bg-[#0b0f1a] outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* PASSWORD FIELD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-5 pr-12 py-3 w-full rounded-xl bg-[#0b0f1a] outline-none"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <span
              className="absolute right-4 top-3.5 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* FORGOT PASSWORD */}
          <p
            onClick={() => nav("/forgot-password")}
            className="text-sm text-purple-400 text-right cursor-pointer hover:underline"
          >
            Forgot password?
          </p>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="mt-2 py-3 w-full rounded-xl bg-purple-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4 text-gray-400 text-center">
          New user?{" "}
          <span
            onClick={() => nav("/")}
            className="text-purple-400 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
