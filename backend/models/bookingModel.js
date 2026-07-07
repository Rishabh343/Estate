import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: "propertiesSchema" },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    visitDate: Date,

    visitTime: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);
const bookingModel = mongoose.model("bookingSchema", bookingSchema);
export default bookingModel;
