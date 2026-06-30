import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import interviewService from "../services/interview.service.js";

export const startInterview = asyncHandler(async (req, res) => {
  const { role, difficulty } = req.body;

  const session = await interviewService.startInterview(
    req.user.id,
    role,
    difficulty
  );

  res.status(201).json(
    ApiResponse.success(
      "Interview created successfully",
      session
    )
  );
});

export const submitAnswer = asyncHandler(async (req, res) => {
  const { questionId, answer } = req.body;

  const result = await interviewService.submitAnswer(
    req.user.id,
    questionId,
    answer
  );

  res.json(
    ApiResponse.success(
      "Answer evaluated successfully",
      result
    )
  );
});

export const submitInterview = asyncHandler(async (req, res) => {
  const { sessionId, answers } = req.body;

  const result = await interviewService.submitInterview(
    req.user.id,
    sessionId,
    answers
  );

  res.status(200).json(
    ApiResponse.success(
      "Interview submitted successfully",
      result
    )
  );
});

export const getInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.getInterview(
    req.user.id,
    req.params.id
  );

  res.status(200).json(
    ApiResponse.success(
      "Interview fetched successfully",
      interview
    )
  );
});

export const finishInterview = asyncHandler(async (req, res) => {
  const interview = await interviewService.finishInterview(
    req.user.id,
    req.body.sessionId
  );

  res.status(200).json(
    ApiResponse.success(
      "Interview completed successfully",
      interview
    )
  );
});

export const getHistory = asyncHandler(async (req, res) => {
  const history = await interviewService.getHistory(
    req.user.id
  );

  res.status(200).json(
    ApiResponse.success(
      "Interview history fetched successfully",
      history
    )
  );
});

export const deleteInterview = asyncHandler(async (req, res) => {
  const result = await interviewService.deleteInterview(
    req.user.id,
    req.params.id
  );

  res.status(200).json(
    ApiResponse.success(
      result.message,
      null
    )
  );
});