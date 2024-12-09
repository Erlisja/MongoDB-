# Course-Enrollment-System

The **Course Enrollment System** is a web application built with **Node.js**, **Express**, and **JSX** view engine. The application provides a platform for users to log in and access their personalized dashboard. The system allows users to enroll in and drop courses, view their course history, and provides role-specific functionality for Admin, Students, and Teachers.



### Available Features:

- **Admin Dashboard**: Admins can log in and access the system via the "Access the system as Admin" link. The credentials for Admin are:
  - **Username**: `Admin`
  - **Password**: `1234`
  - The Admin can  manage users and courses by editing or deleting them but the features are yet under development.
  
- **Student Dashboard**: After logging in, students can:
  - View their **current courses**.
  - View **past enrollments**.
  - **Enroll** in courses.
  - **Drop** courses.
  - Use the credentials to log in and access their dashboard:
    - **Username**: The email address from the mock user database.
    - **Password**: `1234` for all users.
  
- **Teacher Role**: The logic and functionality for the teacher role are not yet implemented. At this moment, users with the role `teacher` are redirected to a placeholder message that says "Page under construction".

- **Error Handling**: Custom error middleware is used to handle errors like incorrect login credentials or failed user authentication.



## Key Routes

1. **`GET /login`**: Displays the login page for users to enter credentials.
2. **`POST /login`**: Handles user login logic. After successful login, users are redirected to their respective dashboards based on their role.
3. **`/system/student`**: Student dashboard, where students can view their courses, enroll in new ones, or drop existing courses.
4. **`/system/admin/dashboard`**: Admin dashboard where the admin can control courses and users. 
5. **`/system/teacher`**: Placeholder page for the teacher role (not implemented yet).
6. **`/logout`**: Logs the user out and redirects to the login page.

## How the App Works

### 1. Login Process

- **Admin Login**: The admin can log in using the following credentials:
  - **Username**: `Admin`
  - **Password**: `1234`
  
  Admins can access the admin dashboard, but the logic for managing users or performing other admin tasks is not yet fully functional.

- **Student Login**: Students can log in using their email address from the mock `users` database and the password `1234` for all users.

### 2. Student Dashboard

- Once logged in, students are redirected to their **Student Dashboard**.
  - Students can:
    - **View Current Courses**: Display all the courses the student is currently enrolled in.
    - **View Past Enrollments**: Show courses the student was enrolled in previously.
    - **Enroll in New Courses**: The user can enroll in courses that are available for him.
    - **Drop Courses**: The ability to drop courses they are enrolled in .

### 3. Admin Dashboard

- After logging in as an admin, the user is redirected to the **Admin Dashboard**.
  - The admin has the potential to manage users and perform admin-related tasks. 
  
## Performance Optimizations

### Indexes
Indexes have been implemented in the following areas to enhance query performance:

1. **Users Collection**
   - `email`: Index for fast authentication queries.
   - `username`: Index for unique user identification.
   - `role`: Index for role-based filtering.

2. **Courses Collection**
   - `courseId`: Index for quick enrollment/drop queries.


