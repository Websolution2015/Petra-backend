import express from 'express';
import nodemon from 'nodemon';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jobRouter from './routes/jobRouter.js';




const app = express();
dotenv.config();

// Use the cors middleware
app.use(cors());

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))


// NOT FOUND MIDDLEWARE

// app.use('*', (req, res) => {
//   res.status(404).json({ msg: 'not found' })
// });

app.use("/api/v1/jobs", jobRouter) 

const port = 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  })
} catch (error) {
  console.log(error);
  // process.exit(1)
}