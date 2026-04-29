/**
 * Selectors → Reusable functions to access Redux state
 * Helps avoid direct state access in components
 */

import type { RootState } from "../../app/store";

export const selectRooms = (state: RootState) => state.rooms.data;
export const selectLoading = (state: RootState) => state.rooms.loading;