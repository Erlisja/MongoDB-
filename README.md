# Course-Enrollment-System

The **Course Enrollment System** is a web application built with **Node.js**, **Express**, and **JSX** view engine. The application provides a platform for users to log in and access their personalized dashboard. The system allows users to enroll in and drop courses, view their course history, and provides role-specific functionality for Admin, Students, and Teachers.

## Overview

The app provides the following key features:
- **Signup**: Users can sign up and choose their role, student/teacher.
- **Login**: Users can log in using predefined credentials. 
- **Admin Dashboard**: Admins can access a dashboard to manage users (though this functionality is still in development).
- **Student Dashboard**: Students can view their courses (current and past enrollments) and can enroll or drop courses.
- **Teacher Role**: The functionality for teachers is still under development.
  
Currently, the system is set up with basic views and logic, but many features are under development.

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

## Dependencies

The app relies on the following Node.js dependencies:

1. **express**: A fast, unopinionated, minimalist web framework for Node.js.
   - Used for creating routes and handling HTTP requests.
   
2. **jsx**: A templating engine that allows you to render dynamic views.
   - Used in the React framework to create user interface components;

3. **express-session**: Middleware for session management.
   - Used to store user session data (user IDs, roles, etc.) between HTTP requests.

4. **body-parser**: Middleware for parsing incoming request bodies.
   - Used for handling `POST` requests and parsing form data submitted by users.

5. **dotenv**: Loads environment variables from a `.env` file.
   - Can be used for managing environment configurations (optional in this version).

6. **nodemon**: Automatically restarts the app when files are changed.
   - Useful during development for automatically reflecting code changes without manually restarting the server.

8. **bcryptjs** (optional for future): For password hashing, if needed in future implementations (e.g., for securely storing passwords).

 --

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
  
### 4. Teacher Role

- The teacher role has not been implemented yet. Currently, users with the role `teacher` will see a placeholder message on their dashboard indicating that the page is under construction.

### 5. Error Handling

- If users enter incorrect credentials (email or password), they will be redirected to a login failure page with an error message.
- Custom error handling middleware is used to display error messages in case of unexpected issues during the login process or any other operation.

### 6. User Management

- The system allows for user management by the admin, but there are still functionalities that need to be implemented.
  
## Known Issues

- **Teacher Role**: The teacher functionality and views are currently placeholders and under development.
- **User Creation**: The functionality for adding new users via the admin dashboard is not yet implemented.
- **Incomplete Views**: Some views and functionalities are still under development, particularly those for managing users and courses.


