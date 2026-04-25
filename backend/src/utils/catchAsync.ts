import { Request, Response, NextFunction } from "express";
/**
 * Higher-order function that wraps async route handlers to catch errors
 * and pass them to the Express error handling middleware.
 */
const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
// Export the catchAsync function for use in other modules
export default catchAsync;