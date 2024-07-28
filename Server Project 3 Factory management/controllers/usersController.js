const express = require("express");
const userService = require("../services/usersService");
const { authenticateToken } = require("../middlewares/authVaildToken");
const router = express.Router();

// Entry point: http://localhost:3000/users

// Route to get user by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id !== id) {
      return res.status(403).send("Unauthorized access");
    }

    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update user by ID
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id !== id) {
      return res.status(403).send("Unauthorized access");
    }
    const obj = req.body;

    const result = await userService.updateUser(id, obj);

    res.send(result);
  } catch (error) {
    // If there's an error, handle it appropriately
    console.error("Error updating user:", error);
    res.status(500).send("Failed to update user: " + error.message);
  }
});

// // Route to Delete user by ID
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id !== id) {
      return res.status(403).send("Unauthorized access");
    }
    const result = await userService.deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
