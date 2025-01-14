// user model
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student','teacher'],
        required: true
    },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },  // reference to Student model
});


userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });  

const User = mongoose.model('User', userSchema);

module.exports = User;


