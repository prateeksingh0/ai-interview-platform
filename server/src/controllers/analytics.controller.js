import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import analyticsService from "../services/analytics.service.js";

export const getAnalytics =
  asyncHandler(async (req, res) => {
    const analytics =
      await analyticsService.getAnalytics(
        req.user.id
      );

    res.status(200).json(
      ApiResponse.success(
        "Analytics fetched successfully",
        analytics
      )
    );
  });