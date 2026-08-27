export const sendSuccess = (res, statusCode, data, message = 'Success', toursCount = undefined) => {
  const payload = {
    status: 'success',
    message,
    data
  };
  
  if (toursCount !== undefined) {
    payload.toursCount = toursCount;
  }
  
  return res.status(statusCode).json(payload);
};

export const sendError = (res, statusCode, message, isDevelopment = false, err = null) => {
  const payload = {
    status: 'error',
    message,
    data: null
  };

  if (isDevelopment && err) {
    payload.stack = err.stack;
    payload.error = err;
  }

  return res.status(statusCode).json(payload);
};
