import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { RoomIdParam } from "../interfaces/room";

/**
 * Middleware: validateRoomId
 * Ensures that the 'id' provided in the request parameters is present 
 * and is a valid MongoDB ObjectId before reaching the controller.
 */

export const validateRoomId = (
  req: Request<RoomIdParam>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // 1. Check if the ID parameter exists in the URL
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Room ID is required",
    });
  }

  // 2. Validate format using Mongoose internal utility
  // Prevents the database from throwing a 500 error on malformed strings
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Room ID format",
    });
  }

  // 3. Validation passed, proceed to the next middleware or controller
  next();
};