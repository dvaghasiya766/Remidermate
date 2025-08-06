// Custom HTTP Error class that extends the built-in Error class
class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Call the parent constructor with the message
    this.code = errorCode; // Add a custom 'code' property to store HTTP status code
  }
}

// Export the class so it can be used in other files
module.exports = HttpError;
