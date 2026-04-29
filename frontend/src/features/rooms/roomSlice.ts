/**
 * Room Slice (Redux Toolkit)
 * --------------------------
 * Manages:
 * - Room state (data, loading, error)
 * - Async API calls (fetch + booking)
 *
 * Architecture:
 * Redux (state) ← Thunks ← Service Layer (OOP)
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RoomState } from "./roomTypes";
import type { IRoom } from "../../interfaces/IRoom";
import { BookingService } from "../../services/BookingService";

// Instantiate service (business logic layer)
const bookingService = new BookingService();

// ------------------- Async Thunks -------------------

/**
 * Fetch all rooms from backend
 *
 * Flow:
 * UI → dispatch(fetchRooms)
 * → thunk → BookingService → API → Redux store
 */
export const fetchRooms = createAsyncThunk<IRoom[]>(
  "rooms/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await bookingService.getRooms();
    } catch (error: any) {
      // Send custom error to Redux
      return rejectWithValue(error.message || "Failed to fetch rooms");
    }
  }
);

/**
 * Book a specific room
 *
 * @param roomId - MongoDB room ID
 */
export const bookRoom = createAsyncThunk<IRoom, string>(
  "rooms/book",
  async (roomId, { rejectWithValue }) => {
    try {
      return await bookingService.bookRoom(roomId);
    } catch (error: any) {
      return rejectWithValue(error.message || "Booking failed");
    }
  }
);

// ------------------- Initial State -------------------

/**
 * Initial Redux state
 */
const initialState: RoomState = {
  data: [],       // list of rooms
  loading: false, // global loading state
  error: null,    // error message
};

// ------------------- Slice -------------------

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},

  /**
   * extraReducers → Handles async thunk lifecycle
   * pending → loading
   * fulfilled → success
   * rejected → error
   */
  extraReducers: (builder) => {
    builder

      // ---------------- FETCH ROOMS ----------------

      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null; // reset previous errors
      })

      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.data = action.payload; // store rooms
        state.loading = false;
      })

      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Error fetching rooms";
      })

      // ---------------- BOOK ROOM ----------------

      .addCase(bookRoom.pending, (state) => {
        // optional: you can add per-room loading later
        state.error = null;
      })

      .addCase(bookRoom.fulfilled, (state, action) => {
        /**
         * Update only the booked room instead of refetching all rooms
         * → Optimized UI update
         */
        const index = state.data.findIndex(
          (room) => room._id === action.payload._id
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      .addCase(bookRoom.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Error booking room";
      });
  },
});

// Export reducer
export default roomSlice.reducer;