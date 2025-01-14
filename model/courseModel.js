const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   credits: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    }
});

courseSchema.index({ course_id: 1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;