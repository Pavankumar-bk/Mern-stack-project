import app from "./app.js";
import cloudinary from "cloudinary";
import https from 'https';
import fs from 'fs';


// Configure Cloudinary with client credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Start the Express server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});





