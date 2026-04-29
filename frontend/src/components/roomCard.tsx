/**
 * RoomCard Component
 * ------------------
 * Represents a single room in the UI.
 *
 * Responsibilities:
 * - Display room details (price, availability)
 * - Provide booking action
 * - Keep UI logic minimal (no business logic here)
 *
 * Props:
 * - room: IRoom → Room data object
 */

import type { IRoom } from "../interfaces/IRoom";
import { useBooking } from "../hooks/useBooking";

export default function RoomCard({ room }: { room: IRoom }) {
  /**
   * Custom hook that abstracts booking logic.
   * Keeps component clean and focused on UI only.
   */
  const { handleBooking } = useBooking();

  return (
    <div className="card">
      {/* Display room price */}
      <h3>₹{room.price}</h3>

      {/* Show availability status */}
      <p>{room.isBooked ? "Booked" : "Available"}</p>

      {/* 
        Show "Book" button only if room is available.
        Prevents users from booking already booked rooms.
      */}
      {!room.isBooked && (
        <button
          onClick={() => handleBooking(room._id)} // Trigger booking action
        >
          Book
        </button>
      )}
    </div>
  );
}