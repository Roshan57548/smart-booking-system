import type { IBookingService } from "../interfaces/IBookingService";
import type { IRoom } from "../interfaces/IRoom";
import { ApiClient } from "./ApiClient";

/**
 * BookingService
 * 
 * Concrete implementation of IBookingService. 
 * Handles the actual network requests to the backend API.
 */
export class BookingService implements IBookingService {
  
  /**
   * Fetches all rooms from the server.
   * Uses .data to extract the payload from the AxiosResponse.
   */
  async getRooms(): Promise<IRoom[]> {
    try {
      // We destructure { data } from the response to satisfy the IRoom[] return type
      return await ApiClient.get<IRoom[]>("/rooms");
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw new Error("Failed to fetch rooms. Please check your connection.");
    }
  }

  /**
   * Sends a POST request to book a specific room.
   * @param roomId The ID of the room to be reserved.
   */
  async bookRoom(roomId: string): Promise<IRoom> {
    try {
      return await ApiClient.post<IRoom>(`/rooms/${roomId}/book`);
    } catch (error) {
      console.error(`Error booking room ${roomId}:`, error);
      throw new Error("Booking failed. The room might already be taken.");
    }
  }
}