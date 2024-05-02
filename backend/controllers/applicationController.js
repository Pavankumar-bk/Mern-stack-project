import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

// Controller to handle POST requests to submit a job application
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  // Check if user is an employer, if so, deny access
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }
  
  // Check if resume file is provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { resume } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  // Check if the resume file format is allowed
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  
  // Upload resume to cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  // Extract necessary details from the request body
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  // Check if job ID is provided
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  // Find the job details using the provided job ID
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  // Create employer ID object
  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };

  // Check if all required fields are filled
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  // Create and save the application
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  
  // Respond with success message and the created application
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

// Controller to handle GET requests to fetch all applications posted by an employer
export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    // Check if user is a job seeker, if so, deny access
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    
    // Find applications posted by the logged-in employer
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    
    // Respond with the fetched applications
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Controller to handle GET requests to fetch all applications made by a job seeker
export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    // Check if user is an employer, if so, deny access
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    
    // Find applications made by the logged-in job seeker
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    
    // Respond with the fetched applications
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Controller to handle DELETE requests to delete a job application made by a job seeker
export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    // Check if user is an employer, if so, deny access
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    
    // Find the application to delete using the provided application ID
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    
    // Delete the found application
    await application.deleteOne();
    
    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
