import React from "react";
import Navbar from "../Home/Navbar";
import Hero from "../Home/Hero";
import Footer from "../Home/Footer";

const Search = () => {
  return (
    <div className="flex flex-col min-h-[8vh] bg-gray-50">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center">
        <Navbar />
      </div>

      <div className="w-full bg-green-200 min-h-[90vh] flex items-center justify-center">
        <Hero />
      </div>

      <div className="w-full min-h-100 bg-black items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Search;
