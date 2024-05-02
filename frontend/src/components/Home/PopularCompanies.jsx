import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  // Array containing popular companies data
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Bengaluru, India",
      openPositions: 10,
      icon: <FaMicrosoft />, // Icon for Microsoft
    },
    {
      id: 2,
      title: "Tesla",
      location: "Palo Alto, California",
      openPositions: 5,
      icon: <SiTesla />, // Icon for Tesla
    },
    {
      id: 3,
      title: "Apple",
      location: "Bengaluru, India",
      openPositions: 20,
      icon: <FaApple />, // Icon for Apple
    },
  ];

  return (
    <div className="companies">
      {/* Title */}
      <div className="container">
        <h3>TOP COMPANIES</h3>
        {/* Cards for each company */}
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                {/* Company icon and details */}
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                {/* Button showing the number of open positions */}
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
