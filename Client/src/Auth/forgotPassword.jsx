import React, { useState, useContext } from "react";
import { Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../Maincontext/Context";
import baseAPI from "../Config/Baseapi";

function ForgotPassword() {
  const { loading, setloading ,setemail ,email } = useContext(MainContext);

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const nav = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror("");
    setsuccess("");

    // ================= Email Validation =================
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      seterror("Enter a valid Gmail address");
      setloading(false);
      return;
    }

    // ================= API CALL =================
    try {
      const res = await axios.post(
       `${baseAPI}/api/user/forgotPassword`, 
        { Email: email ,  }
      );

      setsuccess("Password reset link sent to your email");
      console.log(res.data);

      // optional redirect
      setTimeout(() => {
        nav("/verify");
      }, 3000);

    } catch (err) {
      seterror(err?.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#0b0f1a] text-white">
      <div
        className="
        bg-[#0e1424]
        flex flex-col items-center
        rounded-2xl
        border border-purple-600
        p-6
        w-[360px]
        shadow-[0_20px_60px_rgba(147,51,234,0.35)]
      "
      >
        {/* TITLE */}
        <h1 className="text-xl font-bold flex gap-2 items-center">
          Forgot Password <Dumbbell />
        </h1>

        <p className="text-gray-400 text-sm mt-2 text-center">
          Enter your email to receive a password reset otp
        </p>

        {/* FORM */}
        <form
          onSubmit={handleForgot}
          className="flex flex-col gap-3 w-full mt-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="pl-5 py-3 rounded-xl bg-[#0b0f1a] outline-none focus:ring-2 focus:ring-purple-600"
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          <button
            disabled={loading}
            className="mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* BACK TO LOGIN */}
        <p className="text-sm mt-4 text-gray-400">
          Remember your password?{" "}
          <span
            onClick={() => nav("/login")}
            className="text-purple-500 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;