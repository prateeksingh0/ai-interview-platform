import { body } from "express-validator";

export const startInterviewValidator = [
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required"),

  body("difficulty")
    .isIn(["EASY", "MEDIUM", "HARD"])
    .withMessage("Invalid difficulty"),
];

export const submitAnswerValidator = [
  body("questionId")
    .notEmpty()
    .withMessage("Question ID is required"),

  body("answer")
    .trim()
    .notEmpty()
    .withMessage("Answer is required"),
];

export const submitInterviewValidator = [
  body("sessionId")
    .notEmpty()
    .withMessage("Session ID is required"),

  body("answers")
    .isArray({ min: 1 })
    .withMessage("Answers are required"),

  body("answers.*.questionId")
    .notEmpty()
    .withMessage("Question ID is required"),

  body("answers.*.answer")
    .trim()
    .notEmpty()
    .withMessage("Answer is required"),
];