import type { IRoom } from "./IRoom";

/**
 * IBookingService
 * 
 * Defines the core contract for room management operations.
 * This abstraction allows the UI to remain agnostic of the underlying
 * data source (e.g., API, LocalStorage, or Mock Data).
 */
export interface IBookingService {
  /**
   * Retrieves a collection of all available rooms.
   * @returns A promise that resolves to an array of IRoom objects.
   * @throws Will throw an error if the data fetch fails.
   */
  getRooms(): Promise<IRoom[]>;

  /**
   * Processes a booking request for a specific room.
   * @param roomId - The unique identifier of the room to be reserved.
   * @returns A promise that resolves to the updated IRoom object upon success.
   * @throws Will throw an error if the room is unavailable or the ID is invalid.
   */
  bookRoom(roomId: string): Promise<IRoom>;
}