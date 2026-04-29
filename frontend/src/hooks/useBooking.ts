import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { bookRoom } from "../features/rooms/roomSlice";

/**
 * useBooking Hook
 * 
 * Provides a streamlined interface for room booking actions.
 * Abstracts the Redux dispatch logic and type-safety requirements
 * away from the UI components.
 * 
 * @returns {Object} An object containing the handleBooking method.
 */
export const useBooking = () => {
  // Use the typed dispatch to ensure actions and payloads match our store middleware/reducers
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Dispatches the bookRoom action for a specific room ID.
   * @param id - The unique identifier of the room to be booked.
   */
  const handleBooking = (id: string) => {
    dispatch(bookRoom(id));
  };

  return { handleBooking };
};