// student model
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: {
        type: Array,
        required: false
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
