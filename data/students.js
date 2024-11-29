const students = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '1234',
        enrolledCourses: [5001,5003,5006,5007,5008,5009,5010]
    },
    {
        id: 4,
        name: 'Jane Doe',
        email: 'jdoe@gmail.com',
        password: '1234',
        enrolledCourses: [5001,5003,5006,5007]
    },
    {
        id: 5,
        name: 'Tom Smith',
        email: 'tomsmith@outlook.com',
        password: '1234',
        enrolledCourses: [5002,5004,5005,5009,5010,5011]
    },
    {
        id: 8,
        name: 'David Cole',
        email: 'davcole23@gmail.com',
        password: '1234',
        enrolledCourses: [5003,5015,5007,5008]
    },
    {
        id: 9,
        name: 'Samuel Adams',
        email: 'adams1234@yahoo.com',
        password: '1234',
        enrolledCourses: [5004,5005,5013,5009,5010]
    }
]

module.exports = students;
// for simplicity, I'm using the same password for all the users. 
//In a real-world application, I'd implement a function to hash the password before storing it in the database.