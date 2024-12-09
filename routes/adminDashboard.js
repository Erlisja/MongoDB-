const express = require('express');
const routes = express.Router();
const auth = require('../middleware/authentication'); // import the authentication middleware

// import data
const Student = require('../model/studentModel');
const Course = require('../model/courseModel');
const User = require('../model/userModel');


// Admin dashboard
routes.get('/dashboard',async (req, res) => {
  try {

    const user = await User.findById(req.session.userId);      // check this if the code crashes ****************

    if(user && user.role === 'admin') {
      const courses = await Course.find({});
      const users = await User.find({});
      const students = await Student.find({});

      res.status(200).render('Admin/AdminDashboard', { user, courses, users, students });
    }else{
      res.redirect('/system/admin/login');
    }
  } catch (error) {
    console.log('error during admin dashboard', error);
    res.status(500).send('Internal server error');
  }
});


// Add a new course
routes.post('/courses', async (req, res) => {
  try {
    const {course_id, name, description, credits, startDate } = req.body;
    const newCourse = new Course({
      course_id,
      name,
      description,
      credits,
      startDate
    });

    await newCourse.save();
    res.redirect('/system/admin/dashboard');
  } catch (error) {
    console.log('Error adding course:', error);
    res.status(500).send('Internal server error');
  }
});

// Delete a course
routes.route('/courses/:id')
.delete(async (req, res) => {
  console.log('Received course ID:', req.params.id); 
  try {
    const course_id = req.params.id;
    const course = await Course.findByIdAndDelete(course_id);

    if (!course) {
      return res.status(404).send('Course not found');
    }
    // await course.remove();
    res.redirect('/system/admin/dashboard');
  } catch (error) {
    console.log('Error deleting course:', error);
    res.status(500).send('Internal server error');
  }
});



 

 // PATCH: Update a course description,staring date and credits
  routes.route("/courses/:id")
  .patch(async(req,res)=>{
    try{
      const { id } = req.params;
      const { description, startDate, credits } = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        { description, startDate, credits },
        { new: true, runValidators: true } // Returns the updated document
      );
  
      if (updatedCourse) {
        res.redirect('/system/admin/dashboard');
        
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    }catch(error){
      console.log('error during updating course', error);
      res.status(500).send('Internal server error');
    }
  })
  
  // PUT: Update a user's role
routes.route("/users/:id")
.put(async(req,res)=>{
  try{
    const { id } = req.params;
    const { role, username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role, username, email },
      { new: true }
    );

    // Check if the role has changed to 'student'
    if (role === 'student') {
      // Add the user to the Student collection if not already present
      const studentExists = await Student.findOne({ userId: updatedUser._id });

      if (!studentExists) {
        const student = new Student({
          userId: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
        });
        await student.save();
      }
    } else {
      // If the role is not 'student', the user is removed from the Student collection if present
      await Student.deleteOne({ userId: updatedUser._id });
    }

      res.redirect('/system/admin/dashboard');
  }catch(error){
    console.log('error during updating user', error);
    res.status(500).send('Internal server error');
  }
})


module.exports = routes;
