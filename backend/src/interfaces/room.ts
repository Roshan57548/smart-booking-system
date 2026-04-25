import { Document } from "mongoose";
import { ParamsDictionary } from "express-serve-static-core";

/**
 * Room Interface
 * Represents a Room document in MongoDB with TypeScript typing
 */
export interface Room extends Document {
  price: number;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomIdParam extends ParamsDictionary {
  id: string;
}