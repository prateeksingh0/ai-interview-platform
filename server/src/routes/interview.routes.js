import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  startInterview,
  submitAnswer,
  submitInterview,
  getInterview,
  finishInterview,
  getHistory,
} from "../controllers/interview.controller.js";

import {
  startInterviewValidator,
  submitAnswerValidator,
  submitInterviewValidator,
} from "../validators/interview.validator.js";


const router = Router();

router.post(
  "/start",
  authMiddleware,
  startInterviewValidator,
  validate,
  startInterview
);

router.post(
  "/answer",
  authMiddleware,
  submitAnswerValidator,
  validate,
  submitAnswer
);

router.post(
  "/finish",
  authMiddleware,
  finishInterview
);

router.get(
  "/history",
  authMiddleware,
  getHistory
);

router.get(
  "/:id",
  authMiddleware,
  getInterview
);

router.post(
  "/submit",
  authMiddleware,
  submitInterviewValidator,
  validate,
  submitInterview
);



export default router;