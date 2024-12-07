const express = require('express');
const router = express.Router();

const User = require('../model/userModel');
const Student = require('../model/studentModel');
const Course = require('../model/courseModel');

// Populate the database with some users for testing purposes
// Populate the database with some users for testing purposes   
router.route('/users')
.get(async (req,res)=>{
    console.log("populating the db");
    try {
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



// populate the database with some students for testing purposes
// Seeding the Student collection
// Seeding the Student collection
router.route('/students')
    .get(async (req, res) => {
        try {
            // Clear the Student collection first
            await Student.deleteMany({});

            // Predefined users
            const predefinedUsers = [
                { username: 'JohnDoe', email: 'john@gmail.com', password: '1234', role: 'student' },
                { username: 'JaneDoe', email: 'jdoe@gmail.com', password: '1234', role: 'student' },
                { username: 'TomSmith', email: 'tomsmith@outlook.com', password: '1234', role: 'student' },
                { username: 'DavidCole', email: 'davcole23@gmail.com', password: '1234', role: 'student' },
                { username: 'SamuelAdams', email: 'adams1234@yahoo.com', password: '1234', role: 'student' },
            ];

            // Ensure Users exist (find or create)
            const userMap = {};
            for (const user of predefinedUsers) {
                let existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    // Create the user if not found
                    existingUser = await User.create(user);
                }
                userMap[user.email] = existingUser._id;
            }

            // Define students with `userId` referencing the `User` `_id`
            const students = [
                {
                    userId: userMap['john@gmail.com'],
                    name: 'John Doe',
                    email: 'john@gmail.com',
                    password: '1234',
                    enrolledCourses: [5001, 5003, 5006, 5007, 5008, 5009, 5010],
                },
                {
                    userId: userMap['jdoe@gmail.com'],
                    name: 'Jane Doe',
                    email: 'jdoe@gmail.com',
                    password: '1234',
                    enrolledCourses: [5001, 5003, 5006, 5007],
                },
                {
                    userId: userMap['tomsmith@outlook.com'],
                    name: 'Tom Smith',
                    email: 'tomsmith@outlook.com',
                    password: '1234',
                    enrolledCourses: [5002, 5004, 5005, 5009, 5010, 5011],
                },
                {
                    userId: userMap['davcole23@gmail.com'],
                    name: 'David Cole',
                    email: 'davcole23@gmail.com',
                    password: '1234',
                    enrolledCourses: [5003, 5015, 5007, 5008],
                },
                {
                    userId: userMap['adams1234@yahoo.com'],
                    name: 'Samuel Adams',
                    email: 'adams1234@yahoo.com',
                    password: '1234',
                    enrolledCourses: [5004, 5005, 5013, 5009, 5010],
                },
            ];

            // Insert the students
            await Student.insertMany(students);

            res.status(200).send('Students have been seeded successfully');
        } catch (error) {
            console.error('Error seeding students:', error);
            res.status(500).send('Failed to seed students');
        }
    });

// populate the database with some courses for testing purposes

router.route('/courses')
.get(async (req,res)=>{
    console.log("populating the db with courses");
    try {
        await Course.create([
            {
                id : 5001,
                name : 'Mathematics 101',
                description :'Introduction to Mathematics',
                credits : 3,
                startDate : '2024-01-15',
            },
            {
                id : 5002,
                name : 'Physics 101',
                description :'Introduction to Physics',
                credits : 3,
                startDate : '2024-10-01',
            },
            {
                id : 5003,
                name : 'Biology 101',
                description :'Introduction to Biology',
                credits : 3,
                startDate : '2024-10-01',
            },
            {
                id : 5004,
                name : 'Chemistry 101',
                description :'Introduction to Chemistry',
                credits : 3,
                startDate : '2024-10-01',
            },
            {
                id : 5005,
                name : 'Computer Science 101',
                description :'Introduction to Computer Science',
                credits : 3,
                startDate : '2024-01-15',
            },
            {
                id : 5006,
                name : 'History 101',
                description :'Introduction to History',
                credits : 3,
                startDate : '2024-10-01',
            },
            {
                id : 5007,
                name : 'Economics 101',
                description :'Introduction to Economics',
                credits : 3,
                startDate : '2024-10-01',
            },
            {
                id : 5008,
                name : 'Business 101',
                description :'Introduction to Business',
                credits : 3,
                startDate : '2025-01-15',
            },
            {
                id : 5009,
                name : 'Psychology 101',
                description :'Introduction to Psychology',
                credits : 3,
                startDate : '2025-01-15',
            },
            {
                id : 5010,
                name : 'Sociology 101',
                description :'Introduction to Sociology',
                credits : 3,
                startDate : '2025-10-01',
            },
            {
                id : 5011,
                name : 'Philosophy 101',
                description :'Introduction to Philosophy',
                credits : 3,
                startDate : '2025-01-15',
            },
            {
                id : 5012,
                name : 'Political Science 101',
                description :'Introduction to Political Science',
                credits : 3,
                startDate : '2025-01-15',
            },
            {
                id : 5013,
                name : 'English 101',
                description :'Introduction to English',
                credits : 3,
                startDate : '2024-01-15',
            },
            {
                id : 5014,
                name : 'Art 101',
                description :'Introduction to Art',
                credits : 3,
                startDate : '2025-10-01',
            },
            {
                id : 5015,
                name : 'Music 101',
                description :'Introduction to Music',
                credits : 3,
                startDate : '2025-10-01',
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


module.exports = router;



