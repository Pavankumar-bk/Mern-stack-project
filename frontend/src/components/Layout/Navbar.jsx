import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  // State to manage whether the menu is shown or hidden
  const [show, setShow] = useState(false);
  
  // Accessing authorization status and user information from context
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  
  // Hook for navigation
  const navigateTo = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Logout request to the server
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      // Display success message
      toast.success(response.data.message);
      // Update authorization status
      setIsAuthorized(false);
      // Navigate to login page
      navigateTo("/login");
    } catch (error) {
      // Display error message if logout fails
      toast.error(error.response.data.message);
      // Update authorization status
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>
        {/* Navigation menu */}
        <ul className={!show ? "menu" : "show-menu menu"}>
          {/* Home link */}
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          {/* All jobs link */}
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          {/* Applications link */}
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {/* Employer-specific links */}
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          {/* Logout button */}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        {/* Hamburger menu icon */}
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
