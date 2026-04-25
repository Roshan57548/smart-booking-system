import { Response } from "express";

/**
 * Centralized Success Response Handler
 * Standardizes the structure of all successful API responses.
 * @template T - The type of the data being returned
 */
class AppSuccess<T> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: T;
  public readonly status: string;

  /**
   * @param data - The payload to be sent to the client
   * @param message - Custom success message (defaults to "Request successful")
   * @param statusCode - HTTP status code (defaults to 200)
   */
  constructor(data: T, message: string = "Request successful", statusCode: number = 200) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = "success";
  }

  /**
   * Sends the formatted JSON response to the client
   * @param res - The Express Response object
   */
  public send(res: Response): Response {
    return res.status(this.statusCode).json({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }
}

export default AppSuccess;