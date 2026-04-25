// ---------------------------- Import Dependencies ----------------------------
import mongoose from "mongoose"; // Mongoose library for MongoDB interactions

// ---------------------------- Database Connection Function ----------------------------
const connectDatabase = async (): Promise<void> => {
  const DB: string | undefined = process.env.DATABASE; // MongoDB connection string from environment variables
  // Check if the connection string is provided
  if (!DB) {
    console.error("DATABASE environment variable is not defined.");
    process.exit(1); // Exit if no connection string is provided
  }
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(DB, {
      maxPoolSize: 10, // Maximum number of sockets the MongoDB driver will keep open for this connection
      serverSelectionTimeoutMS: 5000, // Time in ms to wait for a MongoDB server to respond
      socketTimeoutMS: 45000, // Time in ms before a socket times out due to inactivity
    });

    console.log("Database connected successfully");

    // Listen for disconnection events to attempt reconnection automatically
    mongoose.connection.on("disconnected", () => {
      console.warn("Database connection lost. Attempting to reconnect...");
      reconnectWithDelay(DB); // Initiate reconnection after delay
    });
  } catch (err) {
    // If initial connection fails, log the error and retry after a delay
    console.error("Initial database connection failed:", err);
    reconnectWithDelay(DB);
  }
};

// ---------------------------- Reconnection Logic ----------------------------
// Function to handle retrying the connection in case of failure or disconnection
const reconnectWithDelay = (DB: string): void => {
  setTimeout(() => {
    mongoose
      .connect(DB, {
        maxPoolSize: 10, // Maximum number of sockets the MongoDB driver will keep open for this connection
        serverSelectionTimeoutMS: 5000, // Time in ms to wait for a MongoDB server to respond
        socketTimeoutMS: 45000, // Time in ms before a socket times out due to inactivity
      })
      .then(() => console.log("Reconnected to database"))
      .catch((err) => console.error("Reconnection attempt failed:", err));
  }, 5000); // Retry after 5 seconds
};

// ---------------------------- Export Connection Function ----------------------------
export default connectDatabase;
  