import { ICard } from "../interfaces/ICard";
import mongoose from "mongoose";

export const Card = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please enter a full name"],
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<ICard & mongoose.Document>("Card");
