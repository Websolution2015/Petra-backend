import mongoose from "mongoose";

const contactUs = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter first name"],
    trim: true
  },

  lastName: {
    type: String,
    required: [true, "Please enter last name"],
    trim: true
  },

  email: {
    type: String,
    required: [true, "Please enter email"]
  },

  phone: {
    type: Number,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

})


export default mongoose.model("ContactUs", contactUs)
