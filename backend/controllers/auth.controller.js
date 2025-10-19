import User from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import generateToken from "../utils/token.js";
import { sendOtpEmail } from "../utils/mail.js";
// signUp
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be atleast 6 characters",
      });
    }
    if (mobile.length < 10) {
      return res.status(400).json({
        success: false,
        message: "mobile number must be of 10 digits",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "sign up error",
      error: error.message,
    });
  }
};

// signIn
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't Exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = generateToken(user._id);
    

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const { password: _, ...userData } = user._doc;
    return res.status(200).json({
      success: true,
      message: "signed in successfully",
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "sign in error",
      error: error.message,
    });
  }
};

// signOut
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "signed out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "sign out error",
      error: error.message,
    });
  }
};

// sendOtp
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success:false,
        message: "User doesn't Exist",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 10*60*1000;

    user.isOtpVerified = false;
    await user.save();

    await sendOtpEmail({email,otp});

    return res.status(200).json({
      success:true,
      message: "otp sent successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in sending otp",
      error: error.message,
    });
  }

};

// verifyOtp
export const verifyOtp = async (req,res) => {
  try {
    const { email, otp } = req.body
    const user = await User.findOne({ email });
    if (!user||user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success:false,
        message: "Invalid OTP",
      });
    }

    user.resetOtp = undefined;
    user.isOtpVerified = true;
    user.otpExpires = undefined;

    await user.save();
    return res.status(200).json({
        success:true,
        message: "OTP Verified Successfully",
      });
  } catch (error) {
    return res.status(400).json({
        success:false,
        message: "Error in OTP Verification",
        error:error.message
      });
  }
}

// resetPassword
export const resetPassword = async (req,res) =>{
  try {
    const {email, newPassword} = req.body; 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success:false,
        message: "User doesn't Exist",
      });
    }
    if (!user.isOtpVerified) {
      return res.status(400).json({
        success:false,
        message: "OTP verification required",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();

    return res.status(200).json({
        success:true,
        message: "Password reset successful",
      });
  } catch (error) {
    return res.status(400).json({
        success:false,
        message: "Error in reset password",
        error:error.message
      });
  }
}

// googleAuth
export const googleAuth =async (req,res) => {
  try {
    const {fullName,email,mobile,role} = req.body;
     const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile,
        role
      })
    }

    const token = generateToken(user._id);
    

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    
    return res.status(200).json({
      success: true,
      message: "signed in successfully",
      user
    });
  } catch (error) {
    return res.status(400).json({
        success:false,
        message: "Error in Google Auth",
        error:error.message
      });
  }
}
