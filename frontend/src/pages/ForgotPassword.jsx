// import React, { useState } from "react";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [step, setStep] = useState(2);
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const [otp,setOtp] = useState()
//   const sendOtp = () => {};
//   const verifyOtp =()=>{};

//   return (
//     <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
//         <div className="flex items-center gap-4 mb-4">
//           <IoArrowBackCircleOutline
//             className="size-6 text-[#ff4d2d] mt-1"
//             onClick={() => navigate("/signin")}
//           />
//           <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
//             Forgot Password
//           </h1>
//         </div>
//         {/* step-1 forgot-password-page */}
//         {step == 1 && (
//           <div>
//             <div className="mb-6">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-medium mb-1"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus: border-orange-500"
//                 placeholder="Enter Your Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//             </div>
//             <button
//               className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-semibold transition duration-200"
//               onClick={sendOtp}
//             >
//               Send OTP
//             </button>
//           </div>
//         )}

//         {/* step-2 enter-otp-page */}
//         {step == 2 && (
//           <div>
//             <div className="mb-6">
//               <label
//                 htmlFor="otp"
//                 className="block text-gray-700 font-medium mb-1"
//               >
//                 OTP
//               </label>
//               <input
//                 type="email"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus: border-orange-500"
//                 placeholder="Enter Your Otp"
//                 onChange={(e) => setOtp(e.target.value)}
//                 value={otp}
//               />
//             </div>
//             <button
//               className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-semibold transition duration-200"
//               onClick={verifyOtp}
//             >
//               Verify OTP
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState, useRef } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const sendOtp = () => {
    setStep(2);
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only keep last digit
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleNewPassword= ()=>{}

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBackCircleOutline
            className="size-6 text-[#ff4d2d] mt-1 cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {/* step-1 forgot-password-page */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-semibold transition duration-200"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </div>
        )}
        {/* step-2 enter-otp-page */}
        {step === 2 && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Enter the 6-digit OTP sent to your email
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl focus:outline-none focus:border-orange-500"
                />
              ))}
            </div>
            <button
              className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-semibold transition duration-200"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}
        {/* step-1 forgot-password-page */}
        {step === 3 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  placeholder="Enter New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                  placeholder="Confirm Your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            <button
              className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 active:scale-95 text-white font-semibold transition duration-200"
              onClick={handleNewPassword}
            >
              Reset Password
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ForgotPassword;
