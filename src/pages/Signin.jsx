import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("auth", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignin}>Login</button>
    
<p className="switch-auth">
  Don’t have an account? <span style={{cursor: "pointer", height: "20px", padding: "2,2,2,2", backgroundColor: "orange"}} onClick={() => navigate("/signup")}>Sign up</span>
</p>
    </div>
  );
}
