const express = require('express');


function errorHandler(err, req, res, next) {
  // Set default status code to 500 if not provided
  const statusCode = err.status || 500;

  // Send structured JSON response
  res.status(statusCode).json({
      message: err.message || 'Something went wrong, please try again later.',
      error: err.stack || err.message
  });

 
  console.error(err.stack || err.message);
}

  
    module.exports = errorHandler;