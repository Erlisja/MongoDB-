const express = require('express');
const router = express.Router();
const User = require('../model/userModel');




router.route('/signup')
    .get((req, res) => {
        res.render('Signup/Signup');
    })
router.route('/signup')
    .post(async (req, res) => {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).render('Signup/SignupFail', { message: 'User with the email already exists' });
            } else {
                // Create and save the new user
                const newUser = new User({ email, password });
                await newUser.save();
                res.status(200).render('Signup/SignupSuccess');
            }
        } catch (error) {
            res.status(400).render('Signup/SignupFail', { message: 'Error in signing up' });

        }
    }
    );


module.exports = router;