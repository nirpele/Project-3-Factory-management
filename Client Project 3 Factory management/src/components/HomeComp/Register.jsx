import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way
    try {
      const loginData = {
        username,
        password,
        email,
      };

      // Validate input data
      if (!username || !password || !email) {
        console.error("All fields are required");
        alert("All fields are required");
        return;
      }

      const url = "http://localhost:3000/auth/register";
      const resp = await axios.post(url, loginData);

      if (resp.status === 201) {
        const data = resp.data.user.username;
        alert(`Hello ${data}, you registered successfully`);
      } else {
        console.error(`Unexpected response code: ${resp.status}`);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Registration failed:", error.response.data);
        alert(`Registration failed: ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        alert("Registration failed: No response from server");
      } else {
        // Other errors
        console.error("Error:", error.message);
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Register</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                    type="email"
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
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
