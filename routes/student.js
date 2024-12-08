const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const Student = require('../model/studentModel');
const Course = require('../model/courseModel.js');

// // Middleware to validate session
// function validateSession(req, res, next) {
//     if (!req.session.studentId) {
//         return res.redirect('/system/login');
//     }
//     next();
// }



// Get the student dashboard
routes.route('/student')
    .get(async (req, res) => {
        try {
            const student = await Student.findOne({ _id: req.session.studentId }).populate('enrolledCourses');
            if (!student) return res.status(400).send('Student not found');

            const enrolledCourseIds = student.enrolledCourses.map(course => course._id);
            const availableCourses = await Course.find({ _id: { $nin: enrolledCourseIds } });

            req.session.studentId = student._id;
            return res.render('Student/StudentDashboard', {
                student,
                enrolledCourses: student.enrolledCourses,
                availableCourses
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    });

// Delete a course
routes.route('/student')
    .delete(async (req, res) => {
        console.log('Request body:', req.body); // Log the entire body
        console.log('Session ID:', req.session.studentId);

        // Check if the studentId exists in session
        if (!req.session.studentId) {
            return res.redirect('/system/login');
        }

        try {
            // Find the student by their session ID
            const student = await Student.findById(req.session.studentId);
            if (!student) {
                return res.status(400).send('Student not found');
            }

            const courseId = req.body.courseId;
            console.log('Course to drop:', courseId);

            if (courseId) {
                // Normalize courseId if necessary (for example, converting to ObjectId)
                const normalizedCourseId = mongoose.Types.ObjectId(courseId);

                // Check if the course is in the student's enrolledCourses list
                const courseIndex = student.enrolledCourses.indexOf(normalizedCourseId);

                if (courseIndex > -1) {
                    // Remove the course from the list
                    student.enrolledCourses.splice(courseIndex, 1);

                    console.log('Updated enrolledCourses:', student.enrolledCourses);

                    // Save the updated student document
                    await student.save();

                    // Fetch the updated lists of enrolled and available courses
                    const enrolledCourses = await Course.find({
                        _id: { $in: student.enrolledCourses }
                    });
                    const availableCourses = await Course.find({
                        _id: { $nin: student.enrolledCourses }
                    });
                    if (!enrolledCourses || !availableCourses) {
                        console.log('Courses are missing');
                    }

                    console.log('Rendering student dashboard with:', student, enrolledCourses, availableCourses);
                    // Render the updated student dashboard
                    return res.render('Student/StudentDashboard', {
                        student,
                        enrolledCourses,
                        availableCourses,
                    });
                } else {
                    console.log('Course not found in enrolledCourses');
                    return res.status(400).send('Course not found in your enrolled courses');
                }
            } else {
                return res.status(400).send('Course ID is required to drop a course');
            }
        } catch (error) {
            console.error('Error in delete route:', error);
            res.status(500).send('Internal server error');
        }
    });




// Add a course
routes.route('/student')
    .post(async (req, res) => {
        try {
            // Find the student
            const student = await Student.findOne({ _id: req.session.studentId });
            if (!student) return res.status(400).send('Student not found');
            // Find the course
            const courseId = req.body.courseId;
            if (!courseId) return res.status(400).send('Course ID is required');

            const courseToAdd = await Course.findById(courseId);
            if (!courseToAdd) return res.status(400).send('Course not found');

            if (new Date(courseToAdd.startDate) <= new Date()) {
                return res.status(400).send('You cannot enroll in a course that has already started');
            }

            if (student.enrolledCourses.includes(courseToAdd._id)) {
                return res.status(400).send('You are already enrolled in this course');
            }
            // Add the course to the student's enrolled courses
            student.enrolledCourses.push(courseToAdd._id);
            await student.save();
            // Get the updated enrolled courses and available courses
            const enrolledCourses = await Course.find({ _id: { $in: student.enrolledCourses } });
            const availableCourses = await Course.find({ _id: { $nin: student.enrolledCourses } });

            return res.render('Student/StudentDashboard', {
                student,
                enrolledCourses,
                availableCourses
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    });

module.exports = routes;
