// ----------------------------- Import Dependencies -----------------------------
import express from "express";
const router = express.Router();

// ----------------------------- Import Route Modules -----------------------------
import roomRoutes from "./roomRoutes";

// ----------------------------- Mount Routes -----------------------------

// Room routes
router.use("/rooms", roomRoutes);

// ----------------------------- Export Router -----------------------------
export default router;