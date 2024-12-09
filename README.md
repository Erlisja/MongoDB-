# Course-Enrollment-System

The **Course Enrollment System** is a web application built with **Node.js**, **Express**, **JSX** and **MongoDB**. The application provides a platform for users to log in and access their personalized dashboard. The system allows users to enroll in and drop courses, view their course history, and provides role-specific functionality for Admin, Students, and Teachers.


## API Features and Fulfilled Requirements

This application is designed following RESTful API best practices and satisfies all specified requirements for data management and interaction with a MongoDB database. Below are the implementation details:

---

### Data Collections

The application uses three main data collections:

1. **Users**
   - Stores information about students, courses, and users.
   - **Key Fields**:
    - `username` (string)
     - `email` (String)
     - `password` (String)
     - `role` (String: `student`, `teacher`, `admin`)
     - `studentId` : (ObjectId: references `Student`)

2. **Courses**
   - Contains details of courses offered.
   - **Key Fields**:
     - `courseName` (String)
     - `description` (String)
     - `credits`  (Number)
     - `startDate`  (Date)

3. **Students**
   - Tracks student enrollment in courses.
   - **Key Fields**:
     - `username` (string)
     - `email` (string)
     - `enrolledCourses` ((ObjectId: references `Courses`))

---

### Data Modeling Practices

- **Normalized Structure**
   - Relationships are managed using referenced IDs (`ObjectId`) between collections.
   - Example: The `studentId` field in the `Users` collection references the `Student` collection for tracking the role of the user.

- **Schema Validation**
   - Ensures data consistency and integrity by validating critical fields like `email` uniqueness,and acceptable `role` values.

---

### API Routes for retrieving data from the database

#### GET Routes

- **Users/Students Courses**
  `system/admin/dashboard`

### Available Features:
- **Admin Dashboard**: Admins can log in and access the system via the "Access the system as Admin" link. The credentials for Admin are:
  - **Username**: `Admin`
  - **Password**: `1234`
  - The Admin can  manage users and courses by editing or deleting them but the features are yet under development.

#### POST Routes
  `system/admin/courses`

#### DELETE Routes
  `system/admin/courses/:id`

#### PATCH Routes
  `system/admin/courses/:id`

#### PUT Routes
  `system/admin/courses/:id`

## Performance Optimizations

### Indexes
Indexes have been implemented in the following areas to enhance query performance:

1. **Users Collection**
   - `email`: Index for fast authentication queries.
   - `username`: Index for unique user identification.
   - `role`: Index for role-based filtering.

2. **Courses Collection**
   - `courseId`: Index for quick enrollment/drop queries.

### Validation Rules
1. **Validation Rules for the Users Collection**
  -The Users collection is subject to the following rules:

**email:**
  -Must be unique across the collection.
  -Required for all users.
**password:**
  -Required for all users.
**role:**
  -Must be one of the following values: student, teacher, or admin.
  -Required for all users.


---

### Login Process

- **Admin Login**: The admin can log in using the following credentials:
  - **Username**: `Admin`
  - **Password**: `1234`
  
  Admins can access the admin dashboard, but the logic for managing users or performing other admin tasks is not yet fully functional.

- **Student Login**: Students can log in using their email address from the mock `users` database and the password `1234` for all users. <br/>

The app is designed to use mongoDB as database for storing the data but in the folder structure you can find the data folder that contains the same data that was used to populate the database. The same information can be find in the populate.js file. The different user emails can be found there for login. Password is the same for all users "1234" for simplicity purposes.

### Student Dashboard

- Once logged in, students are redirected to their **Student Dashboard**.
  - Students can:
    - **View Current Courses**: Display all the courses the student is currently enrolled in.
    - **View Past Enrollments**: Show courses the student was enrolled in previously.
    - **Enroll in New Courses**: The user can enroll in courses that are available for him.
    - **Drop Courses**: The ability to drop courses they are enrolled in .

### Admin Dashboard

- After logging in as an admin, the user is redirected to the **Admin Dashboard**.
  - The admin has the potential to manage users and perform admin-related tasks. 
  

