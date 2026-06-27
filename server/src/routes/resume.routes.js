import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import upload from "../config/multer.js";

import { uploadResume } from "../controllers/resume.controller.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

export default router;