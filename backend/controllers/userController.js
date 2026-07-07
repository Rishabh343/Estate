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
    const token = jwt.sign({ id: user._id, role: user.role }, "secretKey", {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: true,
      message: "Login Success",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
