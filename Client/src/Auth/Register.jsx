import React, { useState, useContext } from "react";
import { Dumbbell, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../Maincontext/Context";
import googlelogo from "./../assets/googlelogo.png"
import baseAPI from "../Config/Baseapi";
function Register() {
  const { loading, setloading, email, setemail } = useContext(MainContext);

  const [passworderror, setpassworderror] = useState("");
  const [roleerrror, setroleerror] = useState(null);
  const [nameerror, setnameerror] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [regData, setregData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
    


  const nav = useNavigate();

  const Registerhandler = async (e) => {
    e.preventDefault();
    setloading(true);

    // ================= Name validation =================
    if (regData.name.trim().length <= 0) {
      setnameerror("Please Enter your name");
      setloading(false);
      return;
    }
    if (regData.name.trim().length <= 3) {
      setnameerror("Your name is too short");
      setloading(false);
      return;
    }
      if (regData.name.trim().length >= 16) {
      setnameerror("This  name is invalid");
      setloading(false);
      return;
    }
  
    // ================= Email validation =================
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(regData.email)) {
      alert("Please enter a valid Gmail address");
      setloading(false);
      return;
    }

    // ================= Password validation =================
    let specialCharRegex = /[@$!%*?&]/;

    if (regData.password.length < 8) {
      setpassworderror("Password must be at least 8 characters");
      setloading(false);
      return;
    } else if (regData.password.length > 15) {
      setpassworderror("Password must not exceed 15 characters");
      setloading(false);
      return;
    } else if (
      regData.password[0] !== regData.password[0].toUpperCase()
    ) {
      setpassworderror("First letter must be capital");
      setloading(false);
      return;
    } else if (!specialCharRegex.test(regData.password)) {
      setpassworderror("Password must contain one special character");
      setloading(false);
      return;
    }

    // ================= Role validation =================
    if (regData.role === "") {
      setroleerror("Select a role");
      setloading(false);
      return;
    }



    // ================= API CALL =================
    try {
      const res = await axios.post(
      `${baseAPI}/api/user/reg`,
        regData,
        { withCredentials: true }
      );
      setemail(res.data.email);
      console.log("Verification code sent:", res.data);
      nav("/verify");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
    } finally {
      setloading(false);
    }

          setTimeout(() => {
    setpassworderror("")
    setnameerror("")
    setroleerror("")
    
  }, 5000);
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
        <h1 className="text-xl font-bold flex gap-2 items-center">
          Register <Dumbbell />
        </h1>

        {/*------------------ Google-------------- */}
        <button className="mt-4 w-full py-3 rounded-xl bg-[#0b0f1a] text-gray-300">
        {/* <img className="h-10 w-10 rounded-full" src={googlelogo} /> */}
          Register with Google
        </button>

        {/*---------- OR---------- */}
        <div className="flex items-center my-3 w-full text-gray-400">
          <div className="flex-1 border-b" />
          <span className="mx-2 text-sm">OR</span>
          <div className="flex-1 border-b" />
        </div>

        {/*------- FORM------------ */}
        <form
          onSubmit={Registerhandler}
          className="flex flex-col gap-2 w-full"
        >
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setregData({ ...regData, name: e.target.value })
            }
            className="pl-5 py-3 rounded-xl bg-[#0b0f1a] outline-none"
          />
          <p className="text-red-600 text-sm">{nameerror}</p>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setregData({ ...regData, email: e.target.value })
            }
            className="pl-5 py-3 rounded-xl bg-[#0b0f1a] outline-none"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setregData({ ...regData, password: e.target.value })
              }
              className="pl-5 pr-12 py-3 w-full rounded-xl bg-[#0b0f1a] outline-none focus:ring-2 focus:ring-purple-600"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-purple-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <p className="text-red-600 text-sm">{passworderror}</p>

          <select
            value={regData.role}
            onChange={(e) =>
              setregData({ ...regData, role: e.target.value })
            }
            className="pl-5 py-3 rounded-xl bg-[#0b0f1a] outline-none"
          >
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="trainer">Trainer</option>
            <option value="owner">Owner</option>
          </select>
          <p className="text-red-600 text-sm">{roleerrror}</p>

          <button
            disabled={loading}
            className="mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-3 text-gray-400">
          Already have an account?{" "}
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

export default Register;
