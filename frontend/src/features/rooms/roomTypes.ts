/**
 * RoomState (Redux State Type)
 * ---------------------------
 * Defines the structure of the rooms slice in Redux store.
 *
 * Why this file exists:
 * - Keeps Redux-specific types separate from domain models (IRoom)
 * - Improves scalability and maintainability
 * - Ensures strong typing across reducers, selectors, and hooks
 */

import type { IRoom } from "../../interfaces/IRoom";

/**
 * RoomState Interface
 *
 * Represents the shape of the "rooms" slice in Redux.
 */
export interface RoomState {
  /**
   * List of all rooms fetched from backend
   */
  data: IRoom[];

  /**
   * Global loading state
   * true → API call in progress
   * false → idle or completed
   */
  loading: boolean;

  /**
   * Stores error message (if any API fails)
   * null → no error
   */
  error: string | null;
}