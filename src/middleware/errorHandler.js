import { sendError } from '../utils/response.js';

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  error.code = err.code;

  if (error.name === 'CastError') {
    error.message = `Resource not found. Invalid: ${err.path}`;
    error.statusCode = 404;
  }

  if (error.code === 11000) {
    const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'Duplicate field value';
    error.message = `Duplicate field value entered: ${value}. Please use another value.`;
    error.statusCode = 400;
  }

  if (error.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    error.message = `Invalid input data. ${errors.join('. ')}`;
    error.statusCode = 400;
  }

  sendError(res, error.statusCode, error.message, process.env.NODE_ENV === 'development', err);
};
