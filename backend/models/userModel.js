import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "owner", "buyer"] },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { timestamps: true },
);
const userModel = mongoose.model("userSchema", userSchema);
export default userModel;
