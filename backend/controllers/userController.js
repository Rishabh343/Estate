import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const Register = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        status: false,
        message: "Already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await userModel.create({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    res.status(201).json({
      status: true,
      message: "User Registered",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Not registered",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "Email not found",
        error: error.message,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        status: false,
        message: "check Email or Password",
      });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log("Generated Token:", token);
    res.status(200).json({
      status: true,
      message: "Login Success",
      token,
      role: user.role,
      user,
    });
  } catch (error) {
    res.status(500).json({
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
      updatedData.profileImage = `http://localhost:8000/uploads/${req.file.filename}`;
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
