import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Initialize Express app
const app = express();

// Load environment variables from config file
config({ path: "./config/config.env" });

// Enable CORS with options
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Allow requests from frontend URL
    method: ["GET", "POST", "DELETE", "PUT"], // Allow specified methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Parse cookies in request headers
app.use(cookieParser());

// Parse JSON bodies in requests
app.use(express.json());

// Parse URL-encoded bodies in requests
app.use(express.urlencoded({ extended: true }));

// Enable file upload middleware
app.use(
  fileUpload({
    useTempFiles: true, // Use temporary files for uploads
    tempFileDir: "/tmp/", // Temporary directory for files
  })
);

// Define routes for user, job, and application endpoints
app.use("/api/v1/user", userRouter); // User endpoints
app.use("/api/v1/job", jobRouter); // Job endpoints
app.use("/api/v1/application", applicationRouter); // Application endpoints

// Establish database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Export Express app
export default app;
