import { IList } from "../interfaces/IList";
import mongoose from "mongoose";

export const List = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<IList & mongoose.Document>("Card");
