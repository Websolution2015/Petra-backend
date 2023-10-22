import express from 'express';
import { upload } from '../middleware/multer.js';
import { addJob, 
  contactUsController, getAllJobs, getJobById, 
  resumeController, 
  updateJob } from '../controller/jobController.js';

const jobRouter = express.Router();


jobRouter.post("/", addJob)
jobRouter.patch("/:id", updateJob)
jobRouter.get("/", getAllJobs)
jobRouter.get("/:id", getJobById)
jobRouter.post("/contact-us", contactUsController)
jobRouter.post("/upload-resume", upload.single('resume'), resumeController)

export default jobRouter;