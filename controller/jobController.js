import jobModel from "../models/jobModel.js";
import contactUsModel from "../models/contactUsModel.js";
import Resume from "../models/resumeSchema.js";
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'df04essjr',
  api_key: '628391574854572',
  api_secret: 'XlB54R74QtmzOIfXafo9wlFUbbw',
});


export const addJob = async (req, res) => {
  const { title, description } = req.body; // Assuming you send title and description in the request body
  console.log(req.body);
  try {
    const newJob = new jobModel({
      title,
      description,
    });

    const savedJob = await newJob.save(); // Save the new job document

    res.status(201).json({ savedJob });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
};

export const updateJob = async (req, res) => {
  const jobId = req.params.id; // Get the job ID from the request parameters
  const { title, description } = req.body; // Assuming you send title and description in the request body
  console.log(jobId);
  try {
    // Find the job by its ID
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the job properties
    job.title = title;
    job.description = description;

    // Save the updated job document
    const updatedJob = await job.save();

    res.status(200).json({ updatedJob });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }

}

//  Controller to get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find();
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; // Assuming you use a route parameter for job ID
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const contactUsController = async (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body; // Assuming you send title and description in the request body
  
  try {
    const newContact = new contactUsModel({
      firstName,
      lastName,
      email,
      message,
      phone,
    });


    // Send the resume as an email attachment
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: 'helendeveloperhub@gmail.com',
        pass: 'oljm ujza inov firi',
      },
    });

    const mailOptions = {
      from: `${firstName}`,
      to: 'helendeveloperhub@gmail.com',
      subject: `New message from ${firstName}`,
      text: `
        First name: ${firstName}
        Last name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    const savedContact = await newContact.save(); // Save the new job document

    res.status(201).json({ savedContact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const resumeController = async (req, res) => {
  try {
    // Handle file uploads and form data
    const { name, email, phone } = req.body;
    const resume = req.file; // The uploaded file

    console.log('Form Data:', req.body);
    console.log('Uploaded File:', resume);

    // Save the file information to the database (Assuming you have a mongoose model)
    const newResume = new Resume({
      name,
      email,
      phone,
      resume: {
        originalName: resume.originalname,
        filename: resume.filename,
      },
    });

    await newResume.save(); // Save the resume data to the database

    // Send the resume as an email attachment
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: 'helendeveloperhub@gmail.com',
        pass: 'oljm ujza inov firi',
      },
    });

    const mailOptions = {
      from: name,
      to: 'info@petrapower.com',
      subject: 'New Resume Submission',
      text: `A new resume has been submitted with the following details:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}`,
      attachments: [
        {
          filename: resume.originalname,
          path: 'uploads/' + resume.filename,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Send a response to the client
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the file' });
  }
};



// export const resumeController = async (req, res) => {
//   try {
//     // Handle file uploads and form data
//     const { name, email, phone } = req.body;
//     const resume = req.file; // The uploaded file
//     console.log(resume.path)

//     // Upload the resume to Cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(resume.path, {
//       resource_type: 'raw',
//     })

//     console.log(uploadResponse);

//     // Send the resume as an email attachment using the secure_url from Cloudinary
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // e.g., 'Gmail'
//       auth: {
//         user: 'helendeveloperhub@gmail.com',
//         pass: 'oljm ujza inov firi',
//       },
//     });

//     const mailOptions = {
//       from: name,
//       to: 'helendeveloperhub@gmail.com',
//       subject: 'New Resume Submission',
//       text: `A new resume has been submitted with the following details:
//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone}`,
//       attachments: [
//         {
//           filename: resume.originalname,
//           path: uploadResponse.secure_url, // Use the secure_url from Cloudinary
//         },
//       ],
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Email error:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });

//     // Send a response to the client
//     res.status(200).json({ message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred while processing the file' });
//   }
// };









