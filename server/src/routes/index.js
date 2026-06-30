import { Router } from "express";

import authRoutes from "./auth.routes.js";
import resumeRoutes from "./resume.routes.js";
import interviewRoutes from "./interview.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import profileRoutes from "./profile.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/resume", resumeRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API v1 Running",
  });
});

router.use("/interview", interviewRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/profile", profileRoutes);

export default router;