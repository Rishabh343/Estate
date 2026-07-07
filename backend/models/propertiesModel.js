import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "House", "Office", "Shop", "Land"],
    },
    purpose: { type: String, enum: ["Sale", "rent"]}, 
    price: Number,
    area: Number,
    furnished: {
      type: String,
      enum: ["Furnished", "Semi Furnished", "unFurnished"],
    },
    address: String,
    city: String,
    state: String,
    pincode: String,
    images: [String],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    avaibility: {
      type: String,
      enum: ["Available", "Sold", "Rented"],
      default: "Available",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const propertiesModel = mongoose.model("propertiesSchema", propertiesSchema);
export default propertiesModel;
