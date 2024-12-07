const express = require ('express');
const router = express.Router();
const User = require('../model/userModel');

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