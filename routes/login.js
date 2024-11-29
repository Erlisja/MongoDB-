const express = require('express');
const router = express.Router();

const users = require('../data/users');
const students = require('../data/students');
const courses = require('../data/courses');

router.route('/login')
    .get((req, res) => {
        res.render('Login/Login');
    })
    .post((req, res) => {
        // check if the user with the email and password exists
        if (req.body.email && req.body.password) {
            const user = users.find(user => user.email === req.body.email && user.password === req.body.password);
            if (user) {
                // store the userID in the session
                req.session.userId = user.id;
                // check if the user is a student
                if (user.role === 'student') {
                    const student = students.find(std => std.id === user.id);
                    // store the studentID in the session
                    req.session.studentId = student.id;

                    return res.status(200).redirect('/system/student');

                } else if (user.role === 'teacher') {
                    return res.status(200).redirect('/system/teacher');
                }
                // If the user role is not recognized
                else {
                    return res.status(400).render('Login/LoginFail', { message: 'Role not recognized. Please contact support.' });
                }

            } else if (!users.some(user => user.email === req.body.email)) {
                return res.status(400).render('Login/LoginFail', { message: 'User with the email does not exist. Please go back to the Signup page!' });
            }
            // password and email dosent match
            else {
                return res.status(400).render('Login/LoginFail', { message: 'Password and email do not match. Please try again!' });
            }
        }
    });



module.exports = router;

