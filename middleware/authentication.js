const express = require('express');
const users = require('../data/users');

function authentication(req,res,next){
    if (req.users && req.users.role === 'admin'){
      return  next();
    }else{
        return res.status(403).send('Access Denied! You are not authorized to access this page');
    }

}

module.exports = authentication;