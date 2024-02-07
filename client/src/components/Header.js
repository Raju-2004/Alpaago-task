import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import png from "../assets/aplaago.png";
const Header = () => {
  const { currentUser, logout } = useAuth();
  // console.log(currentUser.email);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log("Failed to logout"); // Corrected typo here
    }
  }
  
  return (
    <div className="flex justify-between items-center py-4 text-5B4C6E">
      <div className="flex items-center font-bold text-lg">
        <img src={png} alt="Alpaago logo" className="h-16 mr-14 ml-4" />
        <div className="flex gap-28 justify-around items-center">
          <Link to="/" className="font-bold text-lg hover:text-violet-800">
            Home
          </Link>
          <Link to="/" className="hover:text-violet-800">
            About AlpaaGO
          </Link>
          <Link to="/" className="hover:text-violet-800">
            Vendors
          </Link>
          <Link to="/" className="hover:text-violet-800">
            Campus
          </Link>
          <Link to="/" className="hover:text-violet-800">
            Contact Us
          </Link>
        </div>
      </div>
      {currentUser ? (
        <Link
          onClick={handleLogout}
          className="bg-slate-950 hover:bg-violet-900 rounded-3xl transition text-white font-bold mr-10 py-2 px-10"
        >
          Log Out
        </Link>
      ) : (
        <Link
          to="/signup"
          className="bg-slate-950 hover:bg-violet-900 rounded-3xl transition text-white font-bold mr-10 py-2 px-10"
        >
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default Header;
