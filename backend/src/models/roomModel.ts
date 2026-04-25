import mongoose from "mongoose";
import { Room } from "../interfaces/room";

/**
 * Room Schema
 * Defines the structure for room documents in the database.
 */
const roomSchema = new mongoose.Schema<Room>(
  {
    // The cost of the room per night (or booking period)
    price: {
      type: Number,
      required: [true, "A room must have a price"],
    },

    // Tracks availability; defaults to false (available) when created
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

/**
 * Room Model
 * Provides the interface for database operations (CRUD) on the "rooms" collection.
 */
export const RoomModel = mongoose.model<Room>("room", roomSchema);
