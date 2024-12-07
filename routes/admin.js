const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const User = require('../model/userModel');



// const students = require('../data/students');
// const courses = require('../data/courses');
// const users = require('../data/users');

// Admin login
routes.route('/login')
    .get((req, res) => {
        res.render('Admin/AdminLogin');
    })
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;
            // Query the database for the user with the role admin (admin)
            const user = await User.find({ username, password, role: 'admin' });

            if (user) {
                req.session.userId = user.id;   // Store user ID in session
                return res.redirect('/system/admin/dashboard');
            }
            // if the admin is not found
            res.status(401).send('Invalid username or password');



        } catch (error) {
            console.log("error during admin login", error);
            res.status(400).send('Internal server error');
        }



        // const { username, password } = req.body;
        // const user = users.find(u => u.name === username && u.password === password && u.role === 'admin');

        // if (user) {
        //     req.session.userId = user.id; // Store user ID in session
        //     return res.redirect('/system/admin/dashboard'); // Redirect to dashboard
        // }

        // res.status(401).send('Invalid username or password');
    });


module.exports = routes;
