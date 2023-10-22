import mongoose from "mongoose";

const jobs = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },

  description: {
    type: String,
    required: [true, "Please enter product description"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

})


export default mongoose.model("Jobs", jobs)
