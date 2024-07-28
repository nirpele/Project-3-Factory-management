const deptRep = require('../repositories/departmentsRepository');

const getAllDepartments = (filters) => {
  return deptRep.getAllDepartments(filters);
};


const getById = (id) => {
  return deptRep.getById(id);
};

const addDepartment = (obj) => {
  return deptRep.addDepartment(obj);
};

const updateDepartment = (id, obj) => {
  return deptRep.updateDepartment(id, obj);
};

const deleteDepartment = (id) => {
  return deptRep.deleteDepartment(id);
};

module.exports = {
  getAllDepartments,
  getById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};