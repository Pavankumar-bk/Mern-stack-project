import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to verify user authentication
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token is provided
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  // Verify the token and decode its payload
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Find the user based on the decoded ID and attach it to the request object
  req.user = await User.findById(decoded.id);

  // Proceed to the next middleware
  next();
});
