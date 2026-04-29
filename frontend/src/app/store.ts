/**
 * Global Redux Store Configuration
 * Central place where all slices are registered
 */

import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/rooms/roomSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer, // Feature-based reducer
  },
});

/**
 * RootState → Type for entire Redux state
 * AppDispatch → Typed dispatch for hooks
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;