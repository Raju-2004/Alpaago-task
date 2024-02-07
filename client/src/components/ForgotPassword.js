import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="max-w-sm mx-auto mt-4 px-6 py-4 bg-white shadow-md rounded-md">
        <h2 className="text-center text-xl font-bold mb-4">Password Reset</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/signup"  className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </div>
      </div>
      <div className="max-w-sm mx-auto mt-4 text-center">
        Need an account?
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </Link>
      </div>
    </>
  );
}
