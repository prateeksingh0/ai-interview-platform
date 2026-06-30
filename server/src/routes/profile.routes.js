import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  deleteResume,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getProfile
);

router.put(
  "/",
  authMiddleware,
  updateProfile
);

router.delete(
  "/resume",
  authMiddleware,
  deleteResume
);

export default router;