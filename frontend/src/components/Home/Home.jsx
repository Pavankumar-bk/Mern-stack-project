import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  // Accessing authorization status from context
  const { isAuthorized } = useContext(Context);

  // Redirect to login page if not authorized
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  // Rendering home page components
  return (
    <>
      <section className="homePage page">
        {/* Hero section */}
        <HeroSection />
        {/* How It Works section */}
        <HowItWorks />
        {/* Popular Categories section */}
        <PopularCategories />
        {/* Popular Companies section */}
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
