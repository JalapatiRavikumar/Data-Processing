const userService = require("../services/userService");
const asyncHandler = require("../utils/asyncHandler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.listUsers();
  res.status(200).json({ users });
});

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUserByAdmin(req.body);
  res.status(201).json({ user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({ user });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
