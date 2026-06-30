import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import dashboardService from "../services/dashboard.service.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboard(req.user.id);

  res.status(200).json(
    ApiResponse.success(
      "Dashboard fetched successfully",
      data
    )
  );
});