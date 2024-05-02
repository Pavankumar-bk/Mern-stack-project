import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  // Array containing details for each card
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />, // Icon for Live Job
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />, // Icon for Companies
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />, // Icon for Job Seekers
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />, // Icon for Employers
    },
  ];

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            {/* Main title */}
            <h1>Find a job that suits</h1>
            <h1>your interests and skills</h1>
            {/* Description */}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!
            </p>
          </div>
          {/* Image */}
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        {/* Details cards */}
        <div className="details">
          {/* Mapping through details array to render cards */}
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                {/* Icon */}
                <div className="icon">{element.icon}</div>
                {/* Title and subtitle */}
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
