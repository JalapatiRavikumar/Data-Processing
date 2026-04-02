const User = require("../models/User");

const createUser = (payload) => User.create(payload);

const findUserByEmail = (email) => User.findOne({ email });

const findUserById = (id) => User.findById(id);

const getAllUsers = () => User.find().sort({ createdAt: -1 }).select("-password");

const updateUserById = (id, payload) =>
  User.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).select("-password");

const deleteUserById = (id) => User.findByIdAndDelete(id);

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById
};
