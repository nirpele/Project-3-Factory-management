const mongoose = require("mongoose");

// Define schema for departments
const departmentSchema = new mongoose.Schema(
  {
    name: String,
    managerId: String
  },
  { versionKey: false }
);

// Create model for departments
const Department = mongoose.model("department", departmentSchema, "departments");

module.exports = Department;