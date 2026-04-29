import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../features/rooms/roomSlice";
import { selectRooms, selectLoading } from "../features/rooms/roomSelectors";
import type { AppDispatch } from "../app/store";

/**
 * useRooms Custom Hook
 * 
 * Manages the lifecycle of room data. It automatically triggers a fetch
 * on mount and provides the current state of rooms and loading status
 * from the Redux store.
 * 
 * @returns {Object} { rooms, loading }
 */
export const useRooms = () => {
  // Use the typed dispatch from our store configuration
  const dispatch = useDispatch<AppDispatch>();

  // Extract room data and loading state using memoized selectors
  const rooms = useSelector(selectRooms);
  const loading = useSelector(selectLoading);

  /**
   * Side Effect: Fetch rooms on component mount.
   * Empty dependency array ensures this only runs once per consumer mount.
   */
  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]); // Including dispatch is best practice, though it remains stable

  return { rooms, loading };
};