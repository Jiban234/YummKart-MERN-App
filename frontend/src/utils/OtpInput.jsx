import { useEffect, useRef, useState } from "react";

const OTPInput = ({ length = 6, onComplete, onReset }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Check if OTP is complete
    if (otp.every((digit) => digit !== "")) {
      onComplete(otp.join(""));
    }
  }, [otp, onComplete]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    
    // Handle single digit input
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      
      const newOtp = [...otp];
      
      if (otp[index]) {
        // Clear current input
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (idx < length) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastFilledIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleReset = () => {
    setOtp(new Array(length).fill(""));
    inputRefs.current[0].focus();
    if (onReset) onReset();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-[#ff4d2d] focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/20 transition-all duration-200 bg-white"
            style={{
              caretColor: "transparent",
            }}
          />
        ))}
      </div>
      
      <button
        onClick={handleReset}
        className="text-sm text-gray-500 hover:text-[#ff4d2d] transition-colors duration-200 underline"
      >
        Clear OTP
      </button>
    </div>
  );
};

export default OTPInput;