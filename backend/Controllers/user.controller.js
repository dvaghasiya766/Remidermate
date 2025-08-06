const { validationResult } = require("express-validator"); // Import validation result to handle input validation
const HttpError = require("../Models/http.error"); // Import custom error class for HTTP errors
const User = require("../Models/user"); // Import the User model to interact with the database

// getUsers function to fetch all users from the database
const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Fetching Users Failed! Please try again leter...", 500)
    );
  }

  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, nxt) => {
  const { name, email, password } = req.body;
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    console.log("Error: ", errs);
    return nxt(
      new HttpError("Invalid data has beed passed! pleased check you data", 422)
    );
  }

  let exsitingUser;
  try {
    exsitingUser = await User.findOne({ email: email });
  } catch (err) {
    return nxt(new HttpError("Signing up Failed, please try again..."), 500);
  }
  if (exsitingUser) {
    return nxt(
      new HttpError("User exists already! Kindly Login instend...", 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    const result = await createdUser.save();
    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError("Signing up Failed! Please Try Again...", 500);
    return nxt(error);
  }
};

const login = async (req, res, nxt) => {
  const { email, password } = req.body;
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return nxt(
      new HttpError("Invalid data has beed passed! pleased check you data", 422)
    );
  }

  let exsitingUser;
  try {
    exsitingUser = await User.findOne({ email: email });
  } catch (err) {
    return nxt(new HttpError("Logging in Failed, please try again..."), 500);
  }

  if (!exsitingUser || exsitingUser.password !== password) {
    return nxt(
      new HttpError("Invalid Credentials, could not log you in...", 401)
    );
  }

  res.json({ message: "Logged in!" });
};

module.exports = { getUsers, signup, login }; // Export the functions to be used in the routes
// Note: The getUserById function is commented out in the original code, so it is not included here.
// If needed, it can be implemented similarly to the other functions, fetching a user by ID
