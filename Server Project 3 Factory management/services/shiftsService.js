const shiftRep = require('../repositories/shiftsRepository');

const getAllShifts = (filters) => {
  return shiftRep.getAllShifts(filters);
};



const getById = (id) => {
  return shiftRep.getById(id);
};

const addShift = (obj) => {
  return shiftRep.addShift(obj);
};

const updateShift = (id, obj) => {
  return shiftRep.updateShift(id, obj);
};

const deleteShift = (id) => {
  return shiftRep.deleteShift(id);
};

module.exports = {
  getAllShifts,
  getById,
  addShift,
  updateShift,
  deleteShift,
};
