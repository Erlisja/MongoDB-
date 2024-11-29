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
            return res.status(400).send('User with the email already exists');
        }else{
            const newUser = req.body;
            users.push(newUser);
            res.status(201).json(users);
        }
    }

 });


module.exports = router;