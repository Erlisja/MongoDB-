const express = require('express');
const routes = express.Router();

const students = require('../data/students');
const courses = require('../data/courses');



routes.route('/student')
.get((req,res)=>{
    if(!req.session.studentId){
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

module.exports = routes;