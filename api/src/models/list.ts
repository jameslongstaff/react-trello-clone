import { IList } from "../interfaces/IList";
import mongoose from "mongoose";

export const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    index: true
  },
  boardId: {
    type: String,
    required: [true],
    index: true
  }
});

export default mongoose.model<IList & mongoose.Document>("List", listSchema);
