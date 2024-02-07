import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Footer from "./Footer";
import ForgotPassword from "./ForgotPassword";
import UserForm from "./UserForm";
import LandingPage from "./LandingPage";
const App = () => {
  return (
    <AuthProvider>
      <div>
        <Header />
        {/* <Dashboard /> */}
        <Outlet/>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path:'/forgot-password',
        element:<ForgotPassword/>
      },
      {
        path:'user-form',
        element:<UserForm/>
      }
    ],
  },
  
]);
export default App;
