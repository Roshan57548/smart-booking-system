// Import necessary modules
import app from "./app";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./config.env" }); 

// Get the port from environment variables
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});