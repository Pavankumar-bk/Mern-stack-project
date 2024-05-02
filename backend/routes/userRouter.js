import express from "express";
import { login, register, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create Express router
const router = express.Router();

// Routes for handling user authentication and profile
router.post("/register", register); // Route to register a new user
router.post("/login", login); // Route to login user
router.get("/logout", isAuthenticated, logout); // Route to logout user
router.get("/getuser", isAuthenticated, getUser); // Route to get user profile

export default router;
