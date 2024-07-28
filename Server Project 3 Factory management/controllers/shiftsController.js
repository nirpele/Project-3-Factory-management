const express = require("express");
const shiftsService = require("../services/shiftsService"); // Updated import
const { authenticateToken } = require("../middlewares/authVaildToken");
// const { logUserAction } = require("../middlewares/loggingMiddleware");
const router = express.Router();

// Entry point: http://localhost:3000/shifts

// Get All Shifts (with filter)
router.get("/", async (req, res) => {
  // const userId = req.session.userId;
  // console.log(userId);
  try {
    const filters = req.query;
    const shifts = await shiftsService.getAllShifts(filters); // Updated function call
    res.send(shifts);
  } catch (error) {
    res.send(error);
  }
});

// Get Shift by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await shiftsService.getById(id); // Updated function call
    res.send(shift);
  } catch (error) {
    res.send(error);
  }
});

// Add a new shift
router.post("/", authenticateToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await shiftsService.addShift(obj); // Updated function call
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
});

// Update a shift
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await shiftsService.updateShift(id, obj); // Updated function call
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Delete a shift
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await shiftsService.deleteShift(id); 
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
