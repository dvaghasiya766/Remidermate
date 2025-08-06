const express = require("express"); // Import Express to create the server and handle routes
const { check } = require("express-validator"); // Import express-validator to validate incoming request data
const userController = require("../Controllers/user.controller"); // Import the user controller to handle user-related requests

const router = express.Router(); // Create a new router instance

router.get("/", userController.getUsers); // Define a route to get all users, using the getUsers method from the user controller
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6, max: 20 }),
  ],
  userController.signup
); // Define a route for user signup, validating the input data and using the signUp method from the user controller
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
  ],
  userController.login
); // Define a route for user login, validating the input data and using the login method from the user controller
// router.get("/:uid", userController.getUserById); // Define a route to get a user by ID, using the getUserById method from the user controller

// Export the router to be used in the main application file
module.exports = router;
