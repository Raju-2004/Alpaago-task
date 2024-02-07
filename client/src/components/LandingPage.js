import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LandingPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleExploreDashboard = () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/signup"); // or any other route you prefer for non-authenticated users
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">
          Welcome to Our Website
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          At [Your Company Name], we're dedicated to providing you with the best
          experience possible. Our website offers a variety of features to help
          you get the most out of your time with us.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-xl mx-auto bg-gray-200 p-4 rounded-md shadow-md">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold mb-2">
            Check out the weather information
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Get real-time weather information for your location, powered by the
            OpenWeather API.
          </p>
          <button
            onClick={handleExploreDashboard}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full md:w-auto"
          >
            Explore Dashboard
          </button>
        </div>
        <img
          src="https://source.unsplash.com/random/1600x900/?nature,technology"
          alt="weather"
          className="w-full h-64 md:h-auto object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
        />
      </div>
    </div>
  );
}
export default LandingPage;