export function errorHandler(err, req, res, next) {
  console.error(err); // log for debugging (you can enhance with Winston/Datadog etc.)

  // If the error already has a status code, use it
  const statusCode = err.statusCode || 500;

  // Send structured error response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    // only send stack in development for debugging
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
}
export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // set the message property

    this.statusCode = statusCode;
    // mark if it’s client error (4xx) or server error (5xx)
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // mark as an operational error (not a programming bug)
    this.isOperational = true;

    // capture stack trace without including the constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}