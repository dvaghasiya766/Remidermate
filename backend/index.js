// Import required libraries
const express = require("express"); // Import Express framework for building web applications
const cors = require("cors"); // Import CORS to handle cross-origin requests
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interaction
require("dotenv").config(); // Load environment variables from a .env file into process.env

// Import custom error class to handle HTTP-related errors
const HttpError = require("./Models/http.error");
const userRoutes = require("./Routes/user.route");

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests (e.g., from frontend)
app.use(express.json());

// Enable CORS to allow cross-origin requests
app.use(
  cors({
    origin: "*", // Allow requests from any origin. Change to specific domain in production for security.
    methods: ["GET", "POST", "PUT", "DELETE"], // Define which HTTP methods are allowed
    allowedHeaders: ["Content-Type", "Authorization"], // Define which headers are allowed in requests
  })
);

// Function to connect to MongoDB and start the server
const initializeDBAndServer = async () => {
  try {
    // Attempt to connect to MongoDB using URI stored in .env
    await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, start listening on port 5000
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`); // Log a message once the server is up
    });
  } catch (err) {
    // If MongoDB connection fails, log the error and stop the process
    console.error(`DB Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

// Initialize the DB connection and start the server
initializeDBAndServer();

// Define a test API route to check if backend is working
app.get("/api/data", (req, res, next) => {
  res.json({
    message: "Backend says hi!", // Return a simple message as JSON
  });
});

// Use the user routes defined in user.route.js
app.use("/api/users", userRoutes); // Use the user routes defined in user.route.js
// app.use("/api/followups", followUpsRoutes); // Use the user routes defined in user.route.js
// app.use("/api/recivers", reciversRoutes); // Use the user routes defined in user.route.js

// Middleware for handling routes that are not defined (404 errors)
app.use((req, res, next) => {
  const err = new HttpError("Could not find this route.", 404); // Create a custom error
  next(err); // Pass the error to the global error handler
});

// Global error handling middleware (last middleware)
// This catches any error passed using `next(err)`
app.use((error, req, res, next) => {
  res
    .status(error.code || 500) // Set status code from error or default to 500 (server error)
    .json({ message: error.message || "Something went wrong!" }); // Send error message as JSON
});
