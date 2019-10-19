import { IBoard } from "../interfaces/IBoard";
import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true],
      index: true
    },
    title: {
      type: String,
      required: [true],
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBoard & mongoose.Document>("Board", boardSchema);
