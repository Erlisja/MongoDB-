// student model
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // references to courses
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
