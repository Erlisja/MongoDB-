const express = require ('express');
const router = express.Router();

const User = require('../model/userModel');

router.route('/populate',async (req,res)=>{
    console.log("populating the db");
    try {
        await User.create([
            {
                name: 'John Doe',
                email: 'john@gmail.com',
                password: '1234',
                role: 'student'   // could be 'student', 'teacher' or 'admin'
                },
                {
                name: 'Mary Smith',
                email: 'marySmith@gmail.com',
                password: '1234',
                role: 'teacher'
                },
                {
                name: 'Admin',
                password: '1234',
                role: 'admin'
                },
                {
                name: 'Jane Doe',
                email: 'jdoe@yahoo.com', 
                password: '1234',
                role: 'student'
                },
                {
                name: 'Tom Smith',
                email: 'tomsmith@outlook.com',
                password: '1234',
                role: 'student'
                },
                {
                name: 'Jackie Chan',
                email: 'jchan23@yahoo.com',
                password: '1234',
                role: 'teacher'
                },
                {
                name: 'Bruce Lee',
                email: 'bruceel@gmail.com',
                password: '1234',
                role: 'teacher'
                },
                {
                name: 'David Cole',
                email: 'davcole23@gmail.com',
                password: '1234',
                role: 'student'
                },
                {
                name: 'Samuel Adams',
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


router.route('/users')
.get(async (req,res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;