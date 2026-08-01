/* =====================================
   Success Response
===================================== */

export const successResponse = (
  res,
  message = "Success",
  data = {},
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/* =====================================
   Error Response
===================================== */

export const errorResponse = (
  res,
  message = "Something went wrong",
  statusCode = 500,
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/* =====================================
   Pagination Response
===================================== */

export const paginatedResponse = (
  res,
  message,
  data,
  page,
  limit,
  total
) => {
  return res.status(200).json({
    success: true,
    message,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  });
};

/* =====================================
   Export Default
===================================== */

export default {
  successResponse,
  errorResponse,
  paginatedResponse,
};