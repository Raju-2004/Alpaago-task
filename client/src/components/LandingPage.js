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
    <div className="landing-page flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      {/* Hero section */}
      <div className="hero flex flex-col md:flex-row items-center justify-between w-full mx-auto max-w-7xl mt-16 pt-3 pb-20">
        <div className="text-center md:text-left flex-1">
          <h1 className="text-5xl font-bold mb-8">Welcome to Our Website</h1>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            At [Your Company Name], we're dedicated to providing you with the best experience possible. Our website offers a variety of features to help you get the most out of your time with us.
          </p>
          <button
            onClick={handleExploreDashboard}
            className="bg-fuchsia-800 text-white font-bold py-2 px-4 rounded-md hover:bg-fuchsia-950 transition duration-300"
          >
            Explore Dashboard
          </button>
        </div>
        <img
          src="https://source.unsplash.com/random/1600x900/?nature,technology"
          alt="weather"
          className="w-96 h-96 ml-4 md:h-auto object-cover rounded-md md:rounded-none md:rounded-r-lg shadow-md"
        />
      </div>

      {/* Weather information section */}
      <div className="weather-info flex flex-col md:flex-row items-center justify-between w-full mx-auto max-w-7xl mt-20 pb-16">
      <img
          src="https://source.unsplash.com/random/1600x900/?weather,beautiful"
          alt="weather illustration"
          className="w-96 h-auto object-cover mr-7 rounded-md md:rounded-none md:rounded-l-lg shadow-md"
        />
        <div className="flex flex-col items-center md:items-start flex-1">
          <h2 className="text-3xl font-bold mb-4">Check out the weather information</h2>
          <p className="text-xl text-gray-700 mb-4 leading-relaxed">Get real-time weather information for your location, powered by the OpenWeather API.</p>
          {/* TODO: Replace with actual weather information */}
          <div className="flex items-center mb-4">
            <div className="text-4xl font-bold mr-4">25°C</div>
            <div className="text-xl text-gray-700">Sunny</div>
          </div>
          <button
            onClick={handleExploreDashboard}
            className="bg-fuchsia-800 text-white font-bold py-2 px-4 rounded-md hover:bg-fuchsia-950 transition duration-300"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
