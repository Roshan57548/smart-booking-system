/**
 * Validation Index
 * Centralizes all validation middlewares for cleaner imports across the application.
 */

// 1. Import specific validations
import { validateRoomId } from "./room.validation";

// 2. Group and export validations
export {
  validateRoomId,
};