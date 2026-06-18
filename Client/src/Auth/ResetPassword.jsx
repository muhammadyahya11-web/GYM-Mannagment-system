import React, { useState } from "react";
import { Dumbbell, Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import baseAPI from "../Config/Baseapi";
function ResetPassword() {
  const nav = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.password || !formData.confirmPassword) {
      return setError("All fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${baseAPI}/api/user/updatePassword/${token}`,
        {
          password: formData.password,
        }
      );

      setSuccess(res.data.message || "Password reset successful");

      setTimeout(() => {
        nav("/");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-white bg-[#0b0f1a]">
      <div className="bg-[#0e1424] p-6 rounded-2xl border-purple-600 border w-[360px] shadow-[0_20px_60px_rgba(147,51,234,0.35)]">

        <h1 className="text-xl font-bold flex gap-2 justify-center mb-6">
          Reset Password <Dumbbell />
        </h1>

        <form
          onSubmit={resetPasswordHandler}
          className="flex flex-col gap-4"
        >
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="pl-5 pr-12 py-3 w-full rounded-xl bg-[#0b0f1a] outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 cursor-pointer text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="pl-5 pr-12 py-3 w-full rounded-xl bg-[#0b0f1a] outline-none"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-3.5 cursor-pointer text-gray-400"
            >
              {showConfirm ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </span>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500 text-sm text-center">
              {success}
            </p>
          )}

          <button
            disabled={loading}
            className="py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        <p className="text-sm mt-5 text-center text-gray-400">
          Remember your password?{" "}
          <span
            onClick={() => nav("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;