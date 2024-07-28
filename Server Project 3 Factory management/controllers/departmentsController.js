const express = require('express');
const departmentsService = require('../services/departmentsService');
const { authenticateToken } = require("../middlewares/authVaildToken");

const router = express.Router();

// Entry point: http://localhost:3000/departments

// Get All Departments (with filter)
router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const departments = await departmentsService.getAllDepartments(filters);
    res.send(departments);
  } catch (error) {
    res.send(error);
  }
});


// Get Department by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const department = await departmentsService.getDepartmentById(id);
    res.send(department);
  } catch (error) {
    res.send(error);
  }
});

// Add a new department
router.post('/', authenticateToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await departmentsService.addDepartment(obj);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
});

// Update a department
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await departmentsService.updateDepartment(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Delete a department
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await departmentsService.deleteDepartment(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
