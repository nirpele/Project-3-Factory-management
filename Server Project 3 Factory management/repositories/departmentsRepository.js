const Department = require('../models/departmentModel');

// Get All Departments
const getAllDepartments = (filters) => {
  return Department.find(filters);
};

// Get Department By ID
const getDepartmentById = (id) => {
  return Department.findById(id);
};

// Add Department
const addDepartment = (obj) => {
  const department = new Department(obj);
  console.log(department)
  return department.save();
};

// Update Department
const updateDepartment = (id, obj) => {
  return Department.findByIdAndUpdate(id, obj);
};

// Delete Department
const deleteDepartment = (id) => {
  return Department.findByIdAndDelete(id);
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};