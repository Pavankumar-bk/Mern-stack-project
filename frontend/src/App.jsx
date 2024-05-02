import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  // Accessing context for authorization status and user data
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  // Fetching user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data from the server
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true, // Include credentials for authentication
          }
        );
        // Set user data and authorize user
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        // If fetching user data fails, set authorization to false
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]); // Dependency array to ensure useEffect runs only when isAuthorized changes

  return (
    <>
      {/* BrowserRouter wraps the entire application to enable routing */}
      <BrowserRouter>
        {/* Render the Navbar component */}
        <Navbar />
        {/* Define routes for different components */}
        <Routes>
          {/* Route for Login component */}
          <Route path="/login" element={<Login />} />
          {/* Route for Register component */}
          <Route path="/register" element={<Register />} />
          {/* Route for Home component */}
          <Route path="/" element={<Home />} />
          {/* Route for Jobs component */}
          <Route path="/job/getall" element={<Jobs />} />
          {/* Route for JobDetails component */}
          <Route path="/job/:id" element={<JobDetails />} />
          {/* Route for Application component */}
          <Route path="/application/:id" element={<Application />} />
          {/* Route for MyApplications component */}
          <Route path="/applications/me" element={<MyApplications />} />
          {/* Route for PostJob component */}
          <Route path="/job/post" element={<PostJob />} />
          {/* Route for MyJobs component */}
          <Route path="/job/me" element={<MyJobs />} />
          {/* Route for NotFound component */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Render the Footer component */}
        <Footer />
        {/* Render the toast notification component */}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
