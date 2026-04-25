// -------------------- Module Imports --------------------
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config({ path: "./config.env" });

// -------------------- Database & Routes --------------------
// Ensure this path matches your file structure and that db.ts uses 'export default'
import connectDatabase from "./config/db";
import routes from "./routes/index";

const app: Application = express();

// -------------------- CORS Configuration --------------------
const isProduction: boolean = process.env.NODE_ENV === "production";

// Define allowed origins with specific types
const allowedOrigins: string[] = isProduction
  ? ["https://gethealthy.co.in", "https://www.gethealthy.co.in"]
  : ["http://localhost:5173"];

// -------------------- Apply CORS Middleware --------------------
app.use(
  cors({
    origin: allowedOrigins, // Restrict access based on origin
    credentials: true, // Allow credentials (cookies, headers)
  })
);

// -------------------- Middleware Setup --------------------
app.use(cookieParser());

// Parse incoming JSON requests with a size limit
app.use(express.json({ limit: "50mb" }));

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// -------------------- Database Connection --------------------
connectDatabase();

// -------------------- Route Handlers --------------------
app.use("/api", routes); // Room-related APIs


export default app;
