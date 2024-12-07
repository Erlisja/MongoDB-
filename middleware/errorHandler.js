const express = require('express');


function errorHandler(err, req, res, next) {
  // Check if headers have already been sent
  if (res.headersSent) {
    // Delegate to the default Express error handler
    return next(err);
}

// Set default status code to 500 if not provided
const statusCode = err.status || 500;

// Send structured JSON response
res.status(statusCode).json({
    message: err.message || 'Something went wrong, please try again later.',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Hide stack trace in production
});

// Log the error for debugging
console.error(err.stack || err.message);
}


  
    module.exports = errorHandler;