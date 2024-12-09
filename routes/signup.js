const express = require('express');
const router = express.Router();
const User = require('../model/userModel');

const Student = require('../model/studentModel');


router.route('/signup')
    .get((req, res) => {
        res.render('Signup/Signup');
    })
router.route('/signup')
    .post(async (req, res) => {
        try {
            const {username, email, password, role} = req.body;

               // Normalize the email to lowercase for case-insensitive comparison
               const normalizedEmail = email.toLowerCase();

            const existingUser = await User.findOne({ email: normalizedEmail===User.email });
            if (existingUser) {
                res.status(400).render('Signup/SignupFail', { message: 'User with the email already exists' });
            } else {
                // check if the role is student, create a newstudent and save its object id  as studentId in the user model
                // then create the new user and save it
                    // Create and save the new user
                    const newUser = new User({ username, email: normalizedEmail, password, role, studentId: null });
    
                    // If the role is 'student', create a new student record and link it to the user
                    if (role === 'student') {
                        const newStudent = new Student({ username, email: normalizedEmail  });
                        await newStudent.save();
    
                        // After saving the student, the studentId is available
                        newUser.studentId = newStudent._id;  // Link the studentId in the user model
                    }
    
                    // Save the user 
                    await newUser.save();
                    res.status(200).render('Signup/SignupSuccess');
                }

        } catch (error) {
            res.status(400).render('Signup/SignupFail', { message: 'Error in signing up' });

        }
    }
    );


module.exports = router;