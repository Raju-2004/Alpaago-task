import React from "react";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContext";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Footer from "./Footer";
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
        element: <Dashboard/>
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  
]);
export default App;
