const express = require('express');


// middleware to check if the user is authenticated
function studentAuthent (req, res, next) {
    if (!req.session.studentId){
        return res.status(401).send('Not authenticated. Not authorized to access this page');
    }
    next();
}
;



// This middleware will check if the studentId is stored in the session.
//  If not, it will send a 401 Unauthorized response. 
// If the studentId is present, it will call next() to proceed with the route handler.