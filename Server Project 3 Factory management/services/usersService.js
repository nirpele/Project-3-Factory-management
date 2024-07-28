const userRep = require('../repositories/usersRepository');

const getAllUsers = (filters) => {
  return userRep.getAllUsers(filters);
};

const getUserByUsernameAndPasswordAndEmail = async ( username, email) => {
  return await userRep.getUserByUsernameAndPasswordAndEmail(username, email)
}

const getById = (id) => {
  return userRep.getById(id);
};

const addUser = (obj) => {
  return userRep.addUser(obj);
};

const updateUser = (id, obj) => {
  return userRep.updateUser(id, obj);
};

const deleteUser = (id) => {
  return userRep.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUser,
  deleteUser,
  getUserByUsernameAndPasswordAndEmail
};
