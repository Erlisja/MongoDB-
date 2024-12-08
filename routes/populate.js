const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/userModel');
const Student = require('../model/studentModel');
const Course = require('../model/courseModel.js');


// Populate the database with some users for testing purposes   
router.route('/users')
    .get(async (req, res) => {
        console.log("populating the db");
        try {
            // Clear the users collection before inserting new users
            await User.deleteMany({});

            await User.create([
                {
                    username: 'John Doe',
                    email: 'john@gmail.com',
                    password: '1234',
                    role: 'student'   // could be 'student', 'teacher' or 'admin'
                },
                {
                    username: 'Mary Smith',
                    email: 'marySmith@gmail.com',
                    password: '1234',
                    role: 'teacher'
                },
                {
                    username: 'Admin',
                    email: "admin@gmail.com",
                    password: '1234',
                    role: 'admin'
                },
                {
                    username: 'Jane Doe',
                    email: 'jdoe@yahoo.com',
                    password: '1234',
                    role: 'student'
                },
                {
                    username: 'Tom Smith',
                    email: 'tomsmith@outlook.com',
                    password: '1234',
                    role: 'student'
                },
                {
                    username: 'Jackie Chan',
                    email: 'jchan23@yahoo.com',
                    password: '1234',
                    role: 'teacher'
                },
                {
                    username: 'Bruce Lee',
                    email: 'bruceel@gmail.com',
                    password: '1234',
                    role: 'teacher'
                },
                {
                    username: 'David Cole',
                    email: 'davcole23@gmail.com',
                    password: '1234',
                    role: 'student'
                },
                {
                    username: 'Samuel Adams',
                    email: 'adams1234@yahoo.com',
                    password: '1234',
                    role: 'student'
                }
            ])
            res.status(200).redirect('/system/users');
        } catch (error) {
            console.log(error);
        }
    });


// Populate the database with some students for testing purposes
router.route('/students')
    .get(async (req, res) => {
        console.log('Populating the database with students');
        try {
            // Fetch all courses from the database
            const courses = await Course.find({}, { _id: 1, course_id: 1 });

            // Create a mapping of course_id to MongoDB ObjectId
            const courseMap = {};
            courses.forEach(course => {
                courseMap[course.course_id] = course._id;
            });

            // Create students and link to users
            const students = await Student.create([
                {
                    username: 'John Doe',
                    email: 'john@gmail.com',
                    enrolledCourses: [
                        courseMap[5001],
                        courseMap[5003],
                        courseMap[5006],
                        courseMap[5015],
                        courseMap[5013],
                        courseMap[5005],
                        courseMap[5012],
                    ],
                },
                {
                    username: 'Jane Doe',
                    email: 'jdoe@yahoo.com',
                    enrolledCourses: [
                        courseMap[5002],
                        courseMap[5004],
                        courseMap[5007],
                        courseMap[5009],
                    ],
                },
                {
                    username: 'Tom Smith',
                    email: 'tomsmith@outlook.com',
                    enrolledCourses: [
                        courseMap[5001],
                        courseMap[5012],
                        courseMap[5006],
                        courseMap[5015],
                        courseMap[5013],
                    ],
                },
                {
                    username: 'David Cole',
                    email: 'davcole23@gmail.com',
                    enrolledCourses: [
                        courseMap[5002],
                        courseMap[5004],
                        courseMap[5007],
                        courseMap[5009],
                        courseMap[5005],
                        courseMap[5012],
                    ],
                },
                {
                    username: 'Samuel Adams',
                    email: 'adams1234@yahoo.com',
                    enrolledCourses: [
                        courseMap[5001],
                        courseMap[5003],
                        courseMap[5006],
                        courseMap[5015],
                        courseMap[5013],
                        courseMap[5005],
                        courseMap[5012],
                    ],
                },

            ])

            // Update the corresponding user with the studentId
            for (let i = 0; i < students.length; i++) {
                const user = await User.findOneAndUpdate(
                    { email: students[i].email },
                    { studentId: students[i]._id },
                    { new: true }
                );
            }

            res.status(200).send('Students added successfully');
        } catch (error) {
            console.error('Error adding students:', error);
            res.status(500).send('Error adding students');
        }
    });



// populate the database with some courses for testing purposes
router.route('/courses')
    .get(async (req, res) => {
        console.log("populating the db with courses");
        try {
            await Course.create([
                {
                    course_id: 5001,
                    name: 'Mathematics 101',
                    description: 'Introduction to Mathematics',
                    credits: 3,
                    startDate: '2024-01-15',
                },
                {
                    course_id: 5002,
                    name: 'Physics 101',
                    description: 'Introduction to Physics',
                    credits: 3,
                    startDate: '2024-10-01',
                },
                {
                    course_id: 5003,
                    name: 'Biology 101',
                    description: 'Introduction to Biology',
                    credits: 3,
                    startDate: '2024-10-01',
                },
                {
                    course_id: 5004,
                    name: 'Chemistry 101',
                    description: 'Introduction to Chemistry',
                    credits: 3,
                    startDate: '2024-10-01',
                },
                {
                    course_id: 5005,
                    name: 'Computer Science 101',
                    description: 'Introduction to Computer Science',
                    credits: 3,
                    startDate: '2024-01-15',
                },
                {
                    course_id: 5006,
                    name: 'History 101',
                    description: 'Introduction to History',
                    credits: 3,
                    startDate: '2024-10-01',
                },
                {
                    course_id: 5007,
                    name: 'Economics 101',
                    description: 'Introduction to Economics',
                    credits: 3,
                    startDate: '2024-10-01',
                },
                {
                    course_id: 5008,
                    name: 'Business 101',
                    description: 'Introduction to Business',
                    credits: 3,
                    startDate: '2025-01-15',
                },
                {
                    course_id: 5009,
                    name: 'Psychology 101',
                    description: 'Introduction to Psychology',
                    credits: 3,
                    startDate: '2025-01-15',
                },
                {
                    course_id: 5010,
                    name: 'Sociology 101',
                    description: 'Introduction to Sociology',
                    credits: 3,
                    startDate: '2025-10-01',
                },
                {
                    course_id: 5011,
                    name: 'Philosophy 101',
                    description: 'Introduction to Philosophy',
                    credits: 3,
                    startDate: '2025-01-15',
                },
                {
                    course_id: 5012,
                    name: 'Political Science 101',
                    description: 'Introduction to Political Science',
                    credits: 3,
                    startDate: '2025-01-15',
                },
                {
                    course_id: 5013,
                    name: 'English 101',
                    description: 'Introduction to English',
                    credits: 3,
                    startDate: '2024-01-15',
                },
                {
                    course_id: 5014,
                    name: 'Art 101',
                    description: 'Introduction to Art',
                    credits: 3,
                    startDate: '2025-10-01',
                },
                {
                    course_id: 5015,
                    name: 'Music 101',
                    description: 'Introduction to Music',
                    credits: 3,
                    startDate: '2025-10-01',
                }

            ]
            )
            res.status(200).send('Successfully added courses');
        } catch (error) {
            console.log(error);
        }
    }
    );





// Route to clear the Student collection
router.route('/students/clear')
    .get(async (req, res) => {
        try {
            await Student.deleteMany({});
            res.status(200).send('All students have been deleted');
        } catch (error) {
            console.error('Error clearing the student collection:', error);
            res.status(500).send('Failed to clear the student collection');
        }
    });

// Route to clear the Course collection
router.route('/courses/clear')
    .get(async (req, res) => {
        try {
            await Course.deleteMany({});
            res.status(200).send('All courses have been deleted');
        } catch (error) {
            console.error('Error clearing the course collection:', error);
            res.status(500).send('Failed to clear the course collection');
        }
    });

// Route to clear the User collection
router.route('/users/clear')
    .get(async (req, res) => {
        try {
            await User.deleteMany({});
            res.status(200).send('All users have been deleted');
        } catch (error) {
            console.error('Error clearing the user collection:', error);
            res.status(500).send('Failed to clear the user collection');
        }
    });

module.exports = router;



