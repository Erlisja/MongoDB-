const express = require('express');
const routes = express.Router();

const students = require('../data/students');
const courses = require('../data/courses');



routes.route('/student')
    .get((req, res) => {
        if (!req.session.studentId) {
            return res.redirect('/system/login'); // redirect to login page if no user is logged in
        }
        // Find the student with the id stored in the session
        const student = students.find(std => std.id === req.session.studentId);

        if (student) {
            // Get the courses the student is enrolled in
            const enrolledCourses = courses.filter(course => student.enrolledCourses.includes(course.id));

            // Retrieve available courses for the student
            const availableCourses = courses.filter(course => !student.enrolledCourses.includes(course.id));

            return res.status(200).render('Student/StudentDashboard', {
                student: student,
                enrolledCourses: enrolledCourses,
                availableCourses: availableCourses
            });
        } else {
            return res.status(400).send('Student not found');
        }
    });


// Drop a course
routes.route('/student')
    .delete((req, res) => {
        console.log('Request body:', req.body); // Log the entire body
        console.log('Session ID:', req.session.studentId);

        if (!req.session.studentId) {
            return res.redirect('/system/login');
        }

        const student = students.find(std => std.id === req.session.studentId);
        if (!student) {
            return res.status(400).send('Student not found');
        }

        const courseId = req.body.courseId;
        console.log('Course to drop:', courseId);

        if (courseId) {
            // need yto convert courseId to match the type in enrolledCourses beaucse otherwise it will not match and cause undefined error
            const normalizedCourseId = isNaN(courseId) ? courseId : parseInt(courseId);

            // Find the index of the course to remove
            const courseIndex = student.enrolledCourses.indexOf(normalizedCourseId);

            if (courseIndex > -1) {
                // Remove the course using splice
                student.enrolledCourses.splice(courseIndex, 1);

                console.log('Updated enrolledCourses:', student.enrolledCourses);

                // Update the lists of enrolled and available courses
                const enrolledCourses = courses.filter(course => student.enrolledCourses.includes(course.id));
                const availableCourses = courses.filter(course => !student.enrolledCourses.includes(course.id));

                return res.render('Student/StudentDashboard', {
                    student,
                    enrolledCourses,
                    availableCourses,
                });
            } else {
                console.log('Course not found in enrolledCourses');
                return res.status(400).send('Course not found in your enrolled courses');
            }
        }

        return res.status(400).send('Course ID is required to drop a course');
    });



// add a course

routes.route('/student')
    .post((req, res) => {

        if (!req.session.studentId) {
            return res.redirect('/system/login');
        }


        const student = students.find(std => std.id === req.session.studentId);
        if (!student) {
            return res.status(400).send('Student not found');
        }

        // Get the course ID from the request body
        const courseId = req.body.courseId;
        console.log('Course to add:', courseId);
        // Find the course by ID
        const courseToAdd = courses.find(course => course.id === parseInt(courseId));
        if (!courseToAdd) {
            return res.status(400).send('Course not found');
        }

        // Compare course start date with today's date
        const today = new Date();
        const courseStartDate = new Date(courseToAdd.startDate);

        if (courseStartDate <= today) {
            console.log('Cannot add past course:', courseToAdd.name);
            return res.status(400).send('You cannot enroll in a course that has already started');
        }

        // Check if the student is already enrolled
        if (student.enrolledCourses.includes(courseToAdd.id)) {
            console.log('Already enrolled in course:', courseToAdd.name);
            return res.status(400).send('You are already enrolled in this course');
        }

        // Add the course
        student.enrolledCourses.push(courseToAdd.id);
        console.log('Updated enrolledCourses:', student.enrolledCourses);

        // Update the lists of enrolled and available courses
        const enrolledCourses = courses.filter(course => student.enrolledCourses.includes(course.id));
        const availableCourses = courses.filter(course => !student.enrolledCourses.includes(course.id));

        return res.render('Student/StudentDashboard', {
            student,
            enrolledCourses,
            availableCourses,
        });
    });
module.exports = routes;