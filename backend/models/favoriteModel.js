import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "propertiesSchema",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);