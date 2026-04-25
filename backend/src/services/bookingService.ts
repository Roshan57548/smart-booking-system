import { RoomModel } from "../models/roomModel";
import { Room } from "../interfaces/room";
import AppError from "../utils/appError";

export class BookingService {
  /**
   * Fetches all available and unavailable rooms from the database
   */
  async getRooms(): Promise<Room[]> {
    return await RoomModel.find();
  }

  /**
   * Logical process for booking a room
   * 1. Find room -> 2. Check existence -> 3. Check availability -> 4. Save
   */
  async bookRoom(roomId: string): Promise<Room> {
    const room = await RoomModel.findById(roomId);

    // Using AppError instead of generic Error for better API responses
    if (!room) {
      throw new AppError("Room not found with that ID", 404);
    }
    
    if (room.isBooked) {
      throw new AppError("This room is already booked", 400);
    }

    room.isBooked = true;
    await room.save();

    return room;
  }
}