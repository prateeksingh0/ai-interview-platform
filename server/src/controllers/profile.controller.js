import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

import profileService from "../services/profile.service.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile(req.user.id);

  res.status(200).json(
    ApiResponse.success(
      "Profile fetched successfully",
      profile
    )
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.updateProfile(
    req.user.id,
    req.body.name
  );

  res.status(200).json(
    ApiResponse.success(
      "Profile updated successfully",
      profile
    )
  );
});

export const deleteResume = asyncHandler(async (req, res) => {
  const result =
    await profileService.deleteResume(req.user.id);

  res.status(200).json(
    ApiResponse.success(
      result.message,
      null
    )
  );
});