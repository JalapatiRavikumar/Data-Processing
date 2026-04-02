const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");

const listUsers = () => userRepository.getAllUsers();

const createUserByAdmin = async ({ name, email, password, role, status }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const createdUser = await userRepository.createUser({
    name,
    email,
    password: passwordHash,
    role,
    status
  });

  const user = createdUser.toObject();
  delete user.password;
  return user;
};

const updateUser = async (userId, payload) => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await userRepository.updateUserById(userId, payload);
  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }
  return updatedUser;
};

const deleteUser = async (userId) => {
  const deletedUser = await userRepository.deleteUserById(userId);
  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }
};

module.exports = {
  listUsers,
  createUserByAdmin,
  updateUser,
  deleteUser
};
