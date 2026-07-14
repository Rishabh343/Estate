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
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);
bookingSchema.index(
  {
    buyer: 1,
    property: 1,
  },
  {
    unique: true,
  },
);
const bookingModel = mongoose.model("bookingSchema", bookingSchema);
export default bookingModel;
