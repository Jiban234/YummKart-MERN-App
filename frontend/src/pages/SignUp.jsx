import axios from "axios";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true }
      );

      console.log(result);
    } catch (error) {
      console.log("Sign Up failed:", error.response?.data);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 "
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          YummKart
        </h1>
        <p className=" text-gray-600 mb-8">
          {" "}
          Create your account to get started with delicious food deliveries{" "}
        </p>

        {/* fullName */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus: border-orange-500"
            placeholder="Enter Your Full Name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus: border-orange-500"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {/* Mobile No */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile Number
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus: border-orange-500"
            placeholder="Enter Your Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus: border-orange-500"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="absolute right-3 top-3.5 cursor-pointer
             text-gray-500"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        {/* Role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? {
                        backgroundColor: primaryColor,
                        color: "white",
                      }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: "#333",
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up div */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-semibold transition duration-200"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {/* For Google Sign Up */}

        <button className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-200 active:scale-95 transition-all duration-200">
          <FcGoogle size={25} />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account ?
          <span
            className="text-orange-500 font-semibold cursor-pointer hover:underline hover:text-orange-600 transition-colors ml-1"
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
