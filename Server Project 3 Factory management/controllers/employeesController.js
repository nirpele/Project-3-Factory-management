const express = require("express");
const employeesService = require("../services/employeesService"); // Updated import
const { authenticateToken } = require("../middlewares/authVaildToken");
// const { logUserAction } = require("../middlewares/loggingMiddleware");
const router = express.Router();

// Entry point: http://localhost:3000/employees

// Get All Employees (with filter)
router.get("/", async (req, res) => {

  try {
    const filters = req.query;
    const employees = await employeesService.getAllEmployees(filters); 
    console.log(employees)
    res.send(employees);
  } catch (error) {
    res.send(error);
  }
});

// Get Employee by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeesService.getById(id); 
    res.send(employee);
  } catch (error) {
    res.send(error);
  }
});

// Add a new employee
router.post("/", authenticateToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await employeesService.addEmployee(obj); 
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
});

// Update an employee
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await employeesService.updateEmployee(id, obj); 
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Delete an employee
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeesService.deleteEmployee(id); 
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
