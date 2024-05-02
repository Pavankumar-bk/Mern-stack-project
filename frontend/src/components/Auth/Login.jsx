import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  // State variables for email, password, and role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Accessing authorization status from context
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Display success message and reset form fields
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      // Update authorization status
      setIsAuthorized(true);
    } catch (error) {
      // Display error message if login fails
      toast.error(error.response.data.message);
    }
  };

  // Redirect to home page if already authorized
  if (isAuthorized) {
    return <Navigate to={'/'}/>
  }

  // Rendering login form
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form>
            {/* Select role */}
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            {/* Input for email */}
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="pavankumar@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            {/* Input for password */}
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            {/* Login button */}
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            {/* Link to registration page */}
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        {/* Banner image */}
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
