const express = require('express');
const User = require('../model/userModel');

async function authentication(req, res, next) {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      if (user && user.role === 'admin') {
        req.user = user; // Attach user to req
        return next();
      } else {
        return res.status(403).send('Access Denied! You are not authorized to access this page');
      }
    } catch (error) {
      console.log('Error in authentication middleware:', error);
      return res.status(500).send('Internal server error');
    }
  } else {
    return res.status(403).send('Access Denied! You are not authorized to access this page');
  }
}
module.exports = authentication;