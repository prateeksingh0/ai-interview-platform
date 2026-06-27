import ApiResponse from "../utils/apiResponse.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json(
    ApiResponse.error(
      err.message || "Internal Server Error"
    )
  );
};

export default errorMiddleware;