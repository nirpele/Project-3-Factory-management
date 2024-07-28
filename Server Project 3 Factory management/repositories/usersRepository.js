const User = require("../models/userModel");

// Get All
const getAllUsers = (filters) => {
  return User.find(filters);
};
const getUserByUsernameAndPasswordAndEmail = (username, email) => {
  return User.findOne({ $or: [{ username }, { email }] }).exec();
};

// Get By ID
const getById = (id) => {
  return User.findById(id);
};

// Create
const addUser = (obj) => {
  const user = new User(obj);
  return user.save();
};

// Update
const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj);
};

// Delete
const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUser,
  deleteUser,
  getUserByUsernameAndPasswordAndEmail,
};
