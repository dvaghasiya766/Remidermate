const HttpError = require("../Models/http.error"); // Import custom error class for HTTP errors
const User = require("../Models/user"); // Import the User model to interact with the database

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

module.exports = { getUsers };
