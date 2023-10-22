import mongoose from 'mongoose';

// Define the schema for the Resume model
const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    originalName: String,
    filename: String,
  },
  // You can add more fields as needed
});

// Create the Resume model
const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
