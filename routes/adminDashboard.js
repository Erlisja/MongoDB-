const express = require('express');
const routes = express.Router();

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




    // const user = users.find(u => u.id === req.session.userId && u.role === 'admin');

    // if (user) {
    //     res.status(200).render('Admin/AdminDashboard', { user,courses, users, students });
    // } else {
    //     res.redirect('/system/admin/login');
    // }
//});


// routes.route('/dashboard')
// .get ((req, res) => {
//     return res.json(courses);

//     });



    // GET: List courses with optional filtering
routes.route("/courses")
.get(async(req, res) => {
  try{
    const {instructor} = req.query;
    
   
    // Filter courses by instructor if query is provided
    const courses = instructor
      ? await Course.find({ instructor })
      : await Course.find();

      res.json(courses);
  }catch(error){
    console.log('error during fetching courses', error);
    res.status(500).send('Internal server error');
  }
});

  //   const { instructor } = req.query;
  //   const filteredCourses = instructor
  //     ? courses.filter((course) => course.instructor === instructor)
  //     : courses;
  //   res.json(filteredCourses);
  // });
  


 // PATCH: Update a course description,staring date and credits
  routes.route("/courses/:id")
  .patch(async(req,res)=>{
    try{
      const { id } = req.params;
      const { description, startDate, credits } = req.body;
      const course = await Course.findByIdAndUpdate(
        id,
        { description, startDate, credits },
        { new: true, runValidators: true } // Returns the updated document
      );
  
      if (course) {
        const courses = await Course.find({}); // Fetch updated list of courses
          res.render('Admin/AdminDashboard', { courses });
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    }catch(error){
      console.log('error during updating course', error);
      res.status(500).send('Internal server error');
    }
  })
  // routes.route("/courses/:id")
  // .patch((req, res) => {
  //   const { id } = req.params;
  //   const { description, startDate, credits } = req.body;
  //   const course = courses.find((course) => course.id === parseInt(id));
  
  //   if (course) {
  //       course.description = description;
  //       course.startDate = startDate;
  //       course.credits = credits;
  //     res.render('Admin/AdminDashboard', { courses });
  //   } else {
  //     res.status(404).json({ error: "Course not found" });
  //   }
  //});
  

  // PUT: Update a user's role
routes.route("/users/:id")
.put(async(req,res)=>{
  try{
    const { id } = req.params;
    const { role, username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { role, username, email },
      { new: true }
    );

    if (user) {
      const users = await User.find({}); // Fetch updated list of users
      res.render('Admin/AdminDashboard', { users });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }catch(error){
    console.log('error during updating user', error);
    res.status(500).send('Internal server error');
  }
})






  // routes.route("/users/:id")
  // .patch((req, res) => {
  //   const { id } = req.params;
  //   const { email, username, role } = req.body;
  //   const user = users.find((user) => user.id === parseInt(id));
  
  //   if (user) {
  //     user.email = email;
  //     user.role = role;
  //     user.username = username;
  //   // Update the user in the array (find index based on id)
  //   const index = users.findIndex((user) => user.id === parseInt(id));
  //   users[index] = user;

  //     res.render('Admin/AdminDashboard', { users });
  //   } else {
  //     res.status(404).json({ error: "User not found" });
  //   }
  // });
  

module.exports = routes;
