const express = require('express');
const routes = express.Router();



const students = require('../data/students');
const courses = require('../data/courses');
const users = require('../data/users');

// Admin login
routes.route('/login')
.get((req, res) => {
    res.render('Admin/AdminLogin');
})
.post((req,res)=>{
    const { username, password } = req.body;
    const user = users.find(u => u.name === username && u.password === password && u.role === 'admin');

    if (user) {
        req.session.userId = user.id; // Store user ID in session
        return res.redirect('/system/admin/dashboard'); // Redirect to dashboard
    }

    res.status(401).send('Invalid username or password');
});


module.exports = routes;
