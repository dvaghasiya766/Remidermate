// // import Libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS for handling cross-origin requests
const mongoose = require("mongoose");

require("dotenv").config(); // Load environment variables from .env file

// make instance of Application
const app = express();
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB and start the server
const initializeDBAndServer = async () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@myfirstcluster.hvcgwxc.mongodb.net/`
    )
    .then(() => {
      app.listen(5000, () => {
        console.log("Server Running at http://localhost:5000/");
      });
    })
    .catch((err) => {
      console.log(`DB Error: ${err.message}`);
      process.exit(1);
    });
};
initializeDBAndServer();

// CORS configuration
app.use(
  cors({
    origin: "*", // ✅ Specific origin currently set to allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
  })
);

// Testing the backend connection
app.get("/api/data", (req, res) => {
  res.json({
    message: "Backend says hi!",
    data: {
      UserName: process.env.MONGO_USERNAME,
      Password: process.env.MONGO_PASSWORD,
    },
  });
});