import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
// signUp
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be atleast 6 characters",
      });
    }
    if (mobile.length != 10) {
      return res.status(400).json({
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
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "sign up error",
      error: error.message,
    });
  }
};

// signIn
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't Exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
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
      success: false,
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
