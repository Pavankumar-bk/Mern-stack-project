import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router
const router = express.Router();

// Routes for handling jobs
router.get("/getall", getAllJobs); // Route to get all jobs
router.post("/post", isAuthenticated, postJob); // Route to post a new job
router.get("/getmyjobs", isAuthenticated, getMyJobs); // Route to get jobs posted by the current user
router.put("/update/:id", isAuthenticated, updateJob); // Route to update a job by ID
router.delete("/delete/:id", isAuthenticated, deleteJob); // Route to delete a job by ID
router.get("/:id", isAuthenticated, getSingleJob); // Route to get a single job by ID

export default router;
