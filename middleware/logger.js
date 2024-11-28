const express = require('express');

function logger( req,res,next){
    console.log(`[${new Date().toISOString()}] ${req.method} to ${res.url}`);
    next();
}

module.exports = logger;