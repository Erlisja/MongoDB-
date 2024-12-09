const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const User = require('../model/userModel');



// Admin login
routes.route('/login')
    .get((req, res) => {
        res.render('Admin/AdminLogin');
    })
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate email and password
            if (!username || !password) {
                return res.status(400).send('Email and password are required');
            }

            // Query the database for the user with the email
            const user = await User.findOne({ username });

            // If user not found
            if (!user) {
                return res.status(400).send('User with the email does not exist. Please go back to the Signup page!');
            }

            // Compare the plain-text password with the stored password
            if (user.password !== password) {
                return res.status(400).send('Incorrect password. Please try again!');
            }

            // Store user ID in session
            req.session.userId = user._id;
            req.session.role = user.role; 

            // Role-based redirection
            if (user.role === 'admin') {
                return res.status(200).redirect('/system/admin/dashboard');
            } else {
                return res.status(400).send('Unauthorized');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
       
        

    });


module.exports = routes;
