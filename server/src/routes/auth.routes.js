import { Router } from "express";

import {
  login,
  register,
  me,
} from "../controllers/auth.controller.js";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get(
  "/me",
  authMiddleware,
  me
);

export default router;