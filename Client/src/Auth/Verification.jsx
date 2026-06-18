import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../Maincontext/Context";
import baseAPI from "../Config/Baseapi";

const OTP_LENGTH = 6;

function OtpVerify() {

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);
  const nav = useNavigate();

  const { setemail, email, token, settoken, setUser, } = useContext(MainContext)

  // ================= Timer =================
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ================= Input Change =================
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // ================= Backspace =================
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ================= Paste OTP =================
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp(newOtp);
    inputsRef.current[OTP_LENGTH - 1].focus();
  };

  // ================= Verify OTP =================
  const verifyOtpHandler = async (e) => {


    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }




    try {
      setLoading(true);
      const res = await axios.post(`${baseAPI}/api/user/verify`, { email, otp: otpCode, isReset: true, });
      settoken(res.data.token)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", res.data.user.role)
      localStorage.setItem("isReset", res.data.isReset)
      setUser(res.data.user.role)
      console.log("USER ROLE:", res.data);

       {
        if (res.data.isReset === true) {
          console.log("Reset token received:", res.data.token);
          if (res.data.token) {
            nav(`/reset-password/${res.data.token}`);
          } else {
            setError("Reset token missing from server");
          }
          return;
        }
        else {
          nav("/");
        }

      }

     
  

    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);

      localStorage.setItem("tooken", res.data.token)
      console.log("data from server:", res.data);
      
    }
  };

  // ================= Resend OTP =================
  const resendOtp = async () => {
    try {
      await axios.post(`${baseAPI}/api/user/resendOtp`, { email });
      setTimer(60);
      setOtp(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0].focus();
    } catch {
      setError("Unable to resend OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#0b0f1a] text-white">
      <div className="bg-[#0e1424] w-[360px] border-purple-600 border p-10 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-center">
          Verify your email
        </h2>

        <p className="text-sm text-gray-400 text-center mt-1">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm text-purple-400 text-center">{email}</p>

        <form onSubmit={verifyOtpHandler} className="mt-5">
          <div
            className="flex justify-between gap-1"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-9 h-9 text-center text-lg rounded-xl bg-[#0b0f1a] outline-none border border-gray-700 focus:border-purple-500"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full mt-4 py-3 bg-purple-600 rounded-xl disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          {timer > 0 ? (
            <p>Resend OTP in {timer}s</p>
          ) : (
            <button
              onClick={resendOtp}
              className="text-purple-400 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
