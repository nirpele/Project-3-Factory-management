import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleUserDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { username, password, email };
      const url = "http://localhost:3000/auth/login";
      const resp = await axios.post(url, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = resp.data;
      if (data.accessToken) {
        alert(`Hello ${username}! Login made successfully. Welcome.`);
        sessionStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      alert(`Hello ${username}! Login failed:, ${error.message}`);
      console.error("Login failed:", error.message);
    }
  };

  if (isLoggedIn) {
    navigate("/App");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div
              className="card-header "
              style={{ backgroundColor: "#FFE4C4" }}
            >
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body" style={{ backgroundColor: "#6495ED" }}>
              <form onSubmit={handleUserDetailsSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
