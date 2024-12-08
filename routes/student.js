const express = require('express');
const routes = express.Router();

const Student = require('../model/studentModel');
const Course = require('../model/courseModel');

// Middleware to validate session
function validateSession(req, res, next) {
    if (!req.session.studentId) {
        return res.redirect('/system/login');
    }
    next();
}



// Get the student dashboard
routes.get('/student', async (req, res) => {
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

// Drop a course
routes.delete('/student', async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.session.studentId });
        if (!student) return res.status(400).send('Student not found');

        const courseId = req.body.courseId;
        if (!courseId) return res.status(400).send('Course ID is required');

        const normalizedCourseId = mongoose.Types.ObjectId(courseId);
        const courseIndex = student.enrolledCourses.indexOf(normalizedCourseId);

        if (courseIndex === -1) return res.status(400).send('Course not found in your enrolled courses');

        student.enrolledCourses.splice(courseIndex, 1);
        await student.save();

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

// Add a course
routes.post('/student', async (req, res) => {
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
