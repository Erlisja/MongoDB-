const express = require('express');
const routes = express.Router();

const students = require('../data/students');
const courses = require('../data/courses');
const users = require('../data/users');



// Admin dashboard
routes.get('/dashboard', (req, res) => {
    const user = users.find(u => u.id === req.session.userId && u.role === 'admin');

    if (user) {
        res.status(200).render('Admin/AdminDashboard', { user,courses, users, students });
    } else {
        res.redirect('/system/admin/login');
    }
});


routes.route('/dashboard')
.get ((req, res) => {
    return res.json(courses);

    });



    // GET: List courses with optional filtering
routes.route("/courses")
.get((req, res) => {
    const { instructor } = req.query;
    const filteredCourses = instructor
      ? courses.filter((course) => course.instructor === instructor)
      : courses;
    res.json(filteredCourses);
  });
  
  // PATCH: Update a course description,staring date and credits
  routes.route("/courses/:id")
  .patch((req, res) => {
    const { id } = req.params;
    const { description, startDate, credits } = req.body;
    const course = courses.find((course) => course.id === parseInt(id));
  
    if (course) {
        course.description = description;
        course.startDate = startDate;
        course.credits = credits;
      res.render('Admin/AdminDashboard', { courses });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  });
  

  // PUT: Update a user's role
  routes.route("/users/:id")
  .patch((req, res) => {
    const { id } = req.params;
    const { email, username, role } = req.body;
    const user = users.find((user) => user.id === parseInt(id));
  
    if (user) {
      user.email = email;
      user.role = role;
      user.username = username;
    // Update the user in the array (find index based on id)
    const index = users.findIndex((user) => user.id === parseInt(id));
    users[index] = user;

      res.render('Admin/AdminDashboard', { users });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
  

module.exports = routes;
