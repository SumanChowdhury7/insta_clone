import React, { useState } from "react";
import "../style/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin, loading} = useAuth()
  const navigate = useNavigate()

  if(loading){
    return (
      <h2>Loading....</h2>
    )
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

  handleLogin(username, password)
  .then(res=>{
    console.log(res)
    navigate("/")
  })    
  };
  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
