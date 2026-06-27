import { Router } from "express";

import authRoutes from "./auth.routes.js";
import resumeRoutes from "./resume.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/resume", resumeRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1 Running",
  });
});

export default router;