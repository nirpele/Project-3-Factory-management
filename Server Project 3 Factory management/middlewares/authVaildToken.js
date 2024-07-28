const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      console.log('401')
      return res.status(401).send("No token provided");
    }

    const SECRET_KEY = "some_key";

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Authentication error:", err.message);
        if (err.name === "TokenExpiredError") {
          console.log('402')
          return res.status(401).send("Token expired");
        }
        console.log('403')
        return res.status(401).send("Invalid token");
      }

      req.user = decoded; // Attach user data to request object
      next(); // Proceed to next middleware or route handler
    });
  } catch (error) {
    console.log('404')
    console.error("Authentication error:", error.message);
    res.status(500).send("Failed to authenticate token");
  }
};

module.exports = { authenticateToken };
