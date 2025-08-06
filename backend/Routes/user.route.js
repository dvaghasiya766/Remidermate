const express = require("express"); // Import Express to create the server and handle routes

const userController = require("../Controllers/user.controller"); // Import the user controller to handle user-related requests

const router = express.Router(); // Create a new router instance

router.get("/", userController.getUsers); // Define a route to get all users, using the getUsers method from the user controller

module.exports = router;
