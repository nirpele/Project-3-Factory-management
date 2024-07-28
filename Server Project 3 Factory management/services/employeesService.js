const employeeRep = require('../repositories/employeesRepository');

const getAllEmployees = (filters) => {
  return employeeRep.getAllEmployees(filters);
};


const getById = (id) => {
  return employeeRep.getById(id);
};

const addEmployee = (obj) => {
  return employeeRep.addEmployee(obj);
};

const updateEmployee = (id, obj) => {
  return employeeRep.updateEmployee(id, obj);
};

const deleteEmployee = (id) => {
  return employeeRep.deleteEmployee(id);
};

module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};