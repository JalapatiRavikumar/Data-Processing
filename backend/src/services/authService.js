const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  delete user.password;
  return user;
};

const signToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role, status: user.status }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });

const register = async ({ name, email, password, role }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const createdUser = await userRepository.createUser({
    name,
    email,
    password: passwordHash,
    role: role || "viewer"
  });

  const token = signToken(createdUser);
  return { token, user: sanitizeUser(createdUser) };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.status !== "active") {
    throw new ApiError(403, "User account is inactive");
  }

  const token = signToken(user);
  return { token, user: sanitizeUser(user) };
};

module.exports = {
  register,
  login
};
