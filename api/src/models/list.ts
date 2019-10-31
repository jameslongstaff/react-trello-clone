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
  },
  sortOrder: {
    type: Number
  }
});

listSchema.virtual('id').get(() => { return this._id; });

export default mongoose.model<IList & mongoose.Document>("List", listSchema);
