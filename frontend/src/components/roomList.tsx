/**
 * RoomList Component
 * ------------------
 * Responsible for displaying a list of rooms.
 *
 * Responsibilities:
 * - Fetch room data using custom hook
 * - Handle loading state
 * - Render list of RoomCard components
 *
 * Notes:
 * - Keeps UI layer simple (no business logic here)
 * - Delegates data fetching to useRooms hook
 */

import { useRooms } from "../hooks/useRooms";
import RoomCard from "./RoomCard";

export default function RoomList() {
  /**
   * Custom hook to fetch and manage room data from Redux
   */
  const { rooms, loading } = useRooms();

  /**
   * Show loading indicator while data is being fetched
   */
  if (loading) return <p>Loading...</p>;

  /**
   * Render list of rooms
   */
  return (
    <div>
      {rooms.map((room) => (
        /**
         * Each RoomCard represents a single room
         * key is required for React list rendering optimization
         */
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}