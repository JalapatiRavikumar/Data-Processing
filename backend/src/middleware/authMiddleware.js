const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token missing");
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userRepository.findUserById(payload.sub);

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }
  if (user.status !== "active") {
    throw new ApiError(403, "User account is inactive");
  }

  req.user = {
    id: user._id.toString(),
    role: user.role,
    status: user.status
  };

  next();
});

module.exports = authMiddleware;
