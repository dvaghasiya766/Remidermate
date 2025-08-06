const express = require("express"); // Import Express to create the server and handle routes

const router = express.Router(); // Create a new router instance

router.get("/", (req, res, next) => {
  res.json({
    message: "User route is working!", // Return a simple message as JSON
  });
});

// Export the router to be used in other files
module.exports = router;
