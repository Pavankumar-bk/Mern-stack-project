// Function to send JWT token to user in a cookie
export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken(); // Generate JWT token for user
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Set expiration date for the cookie
    httpOnly: true, // Set httpOnly to true to prevent client-side access
  };

  // Send response with token in a cookie and user data
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
