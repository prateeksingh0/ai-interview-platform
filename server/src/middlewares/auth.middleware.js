import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});

export default authMiddleware;