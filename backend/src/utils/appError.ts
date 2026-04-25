// Custom Error Class for Application Errors
class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  // Constructor for AppError
  constructor(message: string, statusCode: number) {
    // Call the parent constructor
    super(message);
    // Set status code and status
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Mark as operational error
    this.isOperational = true;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;