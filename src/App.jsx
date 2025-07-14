import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App() {
  const authUser = JSON.parse(localStorage.getItem("auth")); // logged-in user

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={authUser} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* optional full cart page route */}
        <Route
          path="/cart"
          element={
            authUser
              ? <Home user={authUser} showCartOnLoad={true} />
              : <Navigate to="/signin" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
