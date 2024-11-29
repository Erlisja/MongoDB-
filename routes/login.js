const express = require('express');
const router = express.Router();

const users = require('../data/users');

router.route('/login')
    .get((req,res)=>{
        res.render('Login/Login');
    })
    .post((req,res)=>{
        // check if the user with the email and password exists
        if(req.body.email && req.body.password){
            const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
            if(user){
                return res.status(200).send('Login successful');
                // check if the email exists
            }else if(!users.some(user => user.email === req.body.email)) {
                return res.status(400).render('Login/LoginFail',{message:'User with the email does not exist. Please go back to the Signup page!'});
            }
            // password and email dosent match
            else{
                return res.status(400).render('Login/LoginFail',{message:'Password and email do not match. Please try again!'});
            }
        }
    });

    module.exports = router;

