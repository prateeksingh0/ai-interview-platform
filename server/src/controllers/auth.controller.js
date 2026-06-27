import authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(201).json(
    ApiResponse.success(
      "User registered successfully",
      result
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.json(
    ApiResponse.success(
      "Login successful",
      result
    )
  );
});