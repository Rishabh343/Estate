import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
dotenv.config();
export const Register = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // 2. Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Please enter a valid email address",
      });
    }

    // 3. Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        status: false,
        message: "Please enter a valid 10-digit phone number",
      });
    }

    // 4. Validate password
    if (password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // 5. Validate role
    // const allowedRoles = ["buyer", "owner"];

    // if (!allowedRoles.includes(role)) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Invalid user role",
    //   });
    // }

    // 6. Check existing email
    const existingUser = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User already registered with this email",
      });
    }

    // 7. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 8. Create user
    const user = await userModel.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      role,
      password: hashedPassword,
    });

    // Don't send password back to frontend
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    };

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      status: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Email not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "check Email or Password",
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Generated Token:", token);
    return res.status(200).json({
      status: true,
      message: "Login Success",
      token,
      role: user.role,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    const updatedData = {
      name,
      phone,
      email,
      address,
    };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "estate/profiles",
      );
      updatedData.profileImage = uploadResult.secure_url;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user.id, updatedData, { new: true })
      .select("-password");

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const deleteProfile = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const searchUser = async (req, res) => {
  try {
    const { name } = req.query;

    const user = await userModel.find({
      name: {
        $regex: name,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const filterUser = async (req, res) => {
  try {
    const { role } = req.query;

    const user = await userModel.find({
      role: {
        $regex: role,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: user.length,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
