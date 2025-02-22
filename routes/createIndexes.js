const mongoose = require('mongoose');
const Course = require('../model/courseModel'); // Adjust the path to your Course model
const User = require('../model/userModel'); // Adjust the path to your User model
async function applyIndexes() {
    try {

            // Connect to MongoDB
            await mongoose.connect('mongodb://localhost:27017/Course-Enrollment-System', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('Connected to MongoDB');

        // Apply indexes
        // this will ensure that the indexes are created, which will improve the performance of queries
        await User.createIndexes();
        console.log('Indexes ensured');
      

        // Close the connection
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error applying indexes:', error);
    }
}

applyIndexes();
