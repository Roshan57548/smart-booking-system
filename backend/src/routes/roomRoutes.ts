// ----------------------------- Import Dependencies -----------------------------
import express from "express";
const router = express.Router();
// ----------------------------- Import Controllers -----------------------------
import { getAllRooms, bookARoom } from "../controllers/roomController";
import { validateRoomId } from "../validation";

// ----------------------------- Define Routes -----------------------------
// GET /api/rooms - Get all rooms
router.get("/", getAllRooms);
// POST /api/rooms/:id/book - Book a room
router.post("/:id/book", validateRoomId, bookARoom);

// ----------------------------- Export Router -----------------------------
export default router;
