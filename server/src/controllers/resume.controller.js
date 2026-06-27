import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import resumeService from "../services/resume.service.js";

export const uploadResume = asyncHandler(
  async (req, res) => {
    const resume =
      await resumeService.uploadResume(
        req.user.id,
        req.file
      );

    res.status(201).json(
      ApiResponse.success(
        "Resume uploaded successfully",
        resume
      )
    );
  }
);