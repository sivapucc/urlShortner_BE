import mongoose from "mongoose";
import shortid from "shortid";

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => shortid.generate(),
  },
  click: {
    type: Number,
    required: true,
    default: 0,
  },
});

const shoturl = mongoose.model("shorturl", shortUrlSchema);
export { shoturl };
