import { IBoard } from "../interfaces/IBoard";
import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    index: true
  }
});

export default mongoose.model<IBoard & mongoose.Document>("Board", boardSchema);
