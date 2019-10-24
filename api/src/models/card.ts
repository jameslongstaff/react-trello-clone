import { ICard } from "../interfaces/ICard";
import mongoose from "mongoose";

export const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    index: true
  },
  content: {
    type: String
  },
  listId: {
    type: String,
    required: [true]
  }
});

export default mongoose.model<ICard & mongoose.Document>("Card", cardSchema);
