import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Signup successful! Please login.");
    navigate("/signin");
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Create Account</button>
        <p className="switch-auth">
        <strong>
        Already have an account?
        </strong>
        
        <span style={{cursor: "pointer", height: "20px", padding: "2,2,2,2", backgroundColor: "orange"}} onClick={() => navigate("/signin")}>  Sign in</span>
        
</p>
    </div>
  );
}
