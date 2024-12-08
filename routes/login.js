const express = require('express');
const router = express.Router();
const errorHandler = require('../middleware/errorHandler'); // import the error handler middleware

// import data
const User = require('../model/userModel');
const Student = require('../model/studentModel');

// GET login page
router.route('/login')
    .get((req, res) => {
        res.render('Login/Login');
    });

    router.route('/login')
    .get((req, res) => {
        res.render('Login/Login');
    });

// POST login page -- this is where the login form data is sent
router.route('/login')
    .post(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Validate email and password (Optional, but recommended for security)
            if (!email || !password) {
                return res.status(400).render('Login/LoginFail', { message: 'Email and password are required' });
            }

            // Query the database for the user with the email
            const user = await User.findOne({ email });

            // If user not found
            if (!user) {
               return res.status(400).render('Login/LoginFail', { message: 'User with the email does not exist. Please go back to the Signup page!' });
            }

            // Compare the plain-text password with the stored password
            if (user.password !== password) {  // Add this line for password comparison
                return res.status(400).render('Login/LoginFail', { message: 'Incorrect password. Please try again!' });
            }

            // Store user ID in session
            req.session.userId = user._id;

            // Role-based redirection
            if (user.role === 'student') {
                // Correct the userId to studentId when querying the Student collection
                const student = await Student.findById(user.studentId); // Now find by studentId from User
                if (!student) {
                   return res.status(400).render('Login/LoginFail', { message: 'Student with the user id does not exist. Please go back to the Signup page!' });
                }

                // Store the studentId in the session
                req.session.studentId = student._id;

                // Redirect to student dashboard
                return res.status(200).redirect('/system/student');
            } else if (user.role === 'teacher') {
                // Redirect to teacher dashboard
                return res.send('Page under construction');
            } else {
                const error = new Error('Role not recognized or incorrect credentials');
                error.status = 400;
                return next(error);  // Pass the error to error handler
            }
        } catch (error) {
            next(error); // Pass errors to the error handler middleware
        }
    });


// error handler middleware
router.use(errorHandler);
module.exports = router;

