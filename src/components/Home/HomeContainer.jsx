import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Featured from "./Featured";
import OwnerBanner from "./OwnerBanner";
import Destinations from "./Destinations";
import Footer from "./Footer"
import LogoStayHub from "../../assets/LogoStayHub.svg"

const HomeContainer = () => {
  return (
    <div className="flex flex-col min-h-[8vh] bg-gray-50">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center justify-center">
        <Navbar /> 
      </div>

      <div className="w-full bg-green-200 min-h-[90vh] flex items-center justify-center">
        <Hero />
      </div>

      <div className="w-full min-h-96 flex items-center justify-center">
        <Featured />
      </div>

      <div className="w-full min-h-64 flex items-center justify-center">
        <OwnerBanner />
      </div>

      <div className="w-full min-h-96 flex items-center justify-center">
        <Destinations />
      </div>

      <div className="w-full min-h-100 bg-black items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default HomeContainer;