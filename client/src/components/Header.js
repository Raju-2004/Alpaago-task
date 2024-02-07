import React from "react";
import { Link } from "react-router-dom";
import png from "../assets/aplaago.png";
const Header = () => {
  return (
    <div className="flex justify-between items-center py-4 text-violet-800">
      <div className="flex items-center">
        <img src={png} alt="Alpaago logo" className="h-16 mr-14" />
        <div className="flex gap-32 justify-around items-center">
          <Link to="/" className="font-bold text-lg">
            Home
          </Link>
          <Link to="/">
            About AlpaaGO
          </Link>
          <Link to="/">
            Vendors
          </Link>
          <Link to="/">
            Campus
          </Link>
          <Link to="/">
            Contact Us
          </Link>
        </div>
      </div>
      <Link
        to="/signup"
        className="bg-slate-950 hover:bg-violet-900 rounded-3xl transition text-white font-bold mr-10 py-2 px-10"
      >
        
        Sign Up
      </Link>
    </div>
  );
};

export default Header;
