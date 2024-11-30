const express = require('express');
const routes = express.Router();

const students = require('../data/students');
const courses = require('../data/courses');
const users = require('../data/users');



// Admin dashboard
routes.get('/dashboard', (req, res) => {
    const user = users.find(u => u.id === req.session.userId && u.role === 'admin');

    if (user) {
        res.status(200).render('Admin/AdminDashboard', { user });
    } else {
        res.redirect('/system/admin/login');
    }
});


routes.route('/dashboard')
.get ((req, res) => {
    return res.json(courses);

    });


module.exports = routes;
