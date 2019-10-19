import { IList } from "../interfaces/IList";
import mongoose from "mongoose";

export const listSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true],
    index: true
  },
  title: {
    type: String,
    required: [true, "Please enter a title"],
    index: true
  }
});

export default mongoose.model<IList & mongoose.Document>("List", listSchema);
