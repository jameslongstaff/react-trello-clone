import { ICard } from "../interfaces/ICard";
import mongoose from "mongoose";

export const cardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true],
    index: true
  },
  title: {
    type: String,
    required: [true],
    index: true
  },
  content: {
    type: String
  }
});

export default mongoose.model<ICard & mongoose.Document>("Card", cardSchema);
