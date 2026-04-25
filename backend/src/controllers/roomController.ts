import { Request, Response, NextFunction } from "express";
import { Room, RoomIdParam } from "../interfaces/room";
import { BookingService } from "../services/bookingService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import AppSuccess from "../utils/appSuccess";

// Instantiate the service
const bookingService = new BookingService();

/**
 * Controller to fetch all rooms
 */
export const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const rooms: Room[] = await bookingService.getRooms();

  // Use AppSuccess to send a standardized response
  new AppSuccess(rooms, "Rooms retrieved successfully").send(res);
});

/**
 * Controller to book a specific room
 */
export const bookARoom = catchAsync(
  async (req: Request<RoomIdParam>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const bookedRoom: Room = await bookingService.bookRoom(id);

      new AppSuccess(bookedRoom, "Room booked successfully", 201).send(res);
    } catch (error: any) {
      // If the service throws "Room not found" or "Already booked"
      // we map that to our custom AppError so the Global Handler can catch it properly
      if (error.message === "Room not found with that ID") {
        return next(new AppError("No room found with that ID", 404));
      }
      if (error.message === "This room is already booked") {
        return next(new AppError("This room is already occupied", 400));
      }

      // Pass any other unexpected errors to the global handler
      next(error);
    }
  },
);
