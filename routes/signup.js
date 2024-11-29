const express = require('express');
const router = express.Router();
 const users = require('../data/users');

 

 router.route('/signup')
    .get((req,res)=>{
        res.render('Signup/Signup');
    })
 .post((req,res)=>{
    
    // check if the user with the email already exists
    if(req.body.email){
        const user = users.find(user => user.email === req.body.email);
        if(user){
            res.render('Signup/SignupFail');
        }else{
            // add the new user to the users array
            //id
            let id = users.length + 1;
            req.body.id = id;
            const newUser = req.body;
            users.push(newUser);
            res.render('Signup/SignupSuccess');
        }
    }

 });


module.exports = router;