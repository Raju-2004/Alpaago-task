import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup ,currentUser,login} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    /* if (isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    } */
    try {
      if (isLogin) {
        try{
          setError("");
          setLoading(true);
          await login(formData.email, formData.password);
          console.log("Login successful");
          navigate('/');

        }
        catch (error) {
          console.error("Failed to create an account:", error);
          setError("Failed to create an account");
        }
        setLoading(false);
      } else {
        // Call signup function
        if (formData.password !== formData.confirmPassword) {
          return setError("Passwords do not match");
        }
        try {
          setError("");
          setLoading(true);
          await signup(formData.email, formData.password);
          console.log("Signup successful");
          navigate('/')
        } catch (error) {
          console.error("Failed to create an account:", error);
          setError("Failed to create an account");
        }
        setLoading(false);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Authentication error:", error);
    }
    console.log("Form data:", formData);
  };
  

  return (
    <div className="flex flex-col items-center  justify-center h-screen bg-white">
      {currentUser && currentUser.email}
      {error && (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Hey</strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            {/* <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg> */}
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full  max-w-md border-2 border-black"
      >
        {/* <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-1 text-sm text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div> */}
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-1 text-sm text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-1 text-sm text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {!isLogin && (
          <div className="flex flex-col mb-4">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-sm text-gray-600"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 cursor-pointer"
          >
            {isLogin ? "Login" : "signup"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
