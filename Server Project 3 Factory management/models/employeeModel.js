const mongoose = require("mongoose");

// Define schema for employees
const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentId: String,
  },
  { versionKey: false } 
);

// Create model for employees
const Employee = mongoose.model("Employee", employeeSchema, "employees");

module.exports = Employee;
