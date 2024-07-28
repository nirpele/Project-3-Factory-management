const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../services/usersService");
const axios = require("axios");
const router = express.Router();

// Entry Point: http://localhost:3000/auth
//login
router.post("/login", async (req, res) => {
  const { username, password, email } = req.body;
  const user = await userService.getUserByUsernameAndPasswordAndEmail(
    username,
    password,
    email
  );

  console.log(user);
  if (!user) {
    return res.status(401).send("Invalid email, username, password");
  }
  const SECRET_KEY = "some_key";

  const token = jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  req.session.userId = user._id;
  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
    }
  });
  console.log();
  res.send({
    accessToken: token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    },
  });
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;
    // Validate required fields
    if (!username || !password || !email) {
      return res.status(400).send("Username, password, and email are required");
    }

    const existingUser = await userService.getUserByUsernameAndPasswordAndEmail(
      username,
      email
    );
  
    if (existingUser!==null) {
      console.log()
      return res.status(409).send("Username or email already exists");
    }

    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const user = data.find(
      (user) => user.email == email && user.username == username
    );

    if (user === undefined) {
      return res.status(410).send("user is not in jsonplaceholder database");
    }

    console.log(user);
    if (user !== undefined) {
      // Create a new user
      const newUser = await userService.addUser({
        username,
        password,
        email,
        fullName,
      });

      // Generate JWT token for the new user
      const SECRET_KEY = "some_key";
      const token = jwt.sign(
        { _id: newUser._id, username: newUser.username, email: newUser.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(201).send({
        accessToken: token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName,
        },
      });
    } else {
      return res.status(410).send("Username or email not exists in database");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Failed to register user");
  }
});

module.exports = router;
