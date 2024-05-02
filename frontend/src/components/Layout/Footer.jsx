import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  // Accessing authorization status from context
  const { isAuthorized } = useContext(Context);

  return (
    // Conditional rendering of footer based on authorization status
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      {/* Copyright information */}
      <div>&copy; All Rights Reserved By CodeWithZeeshu.</div>
      {/* Social media links */}
      <div>
        {/* Facebook link */}
        <Link to={"https://www.facebook.com/profile.php?id=100030535123397"} target="_blank">
          <FaFacebookF />
        </Link>
        {/* YouTube link */}
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaYoutube />
        </Link>
        {/* LinkedIn link */}
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaLinkedin />
        </Link>
        {/* Instagram link */}
        <Link to={"https://www.instagram.com/z_4_zeeshuuu/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
