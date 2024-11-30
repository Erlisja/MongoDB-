const React = require("react");

class AdminDashboard extends React.Component {
  render() {
    const { user } = this.props;
    const { courses } = this.props;
    const { students } = this.props;

    return (
      <>
        <head>
          <title>Admin Dashboard</title>
          <link rel="stylesheet" href="/styles/styles.css " />
        </head>
        <body>
          <header>
            <a href="/system/admin/logout">
              <button>Logout</button>
            </a>
            <h1> Course Enrollment System </h1>
          </header>
          <div className="main">
            <h2>Admin Dashboard</h2>
            <br />
            <div className="courses-container">
              <h3>Courses</h3>
              {courses.map((course) => (
                <div className="course">
                  <h4>{course.name}</h4>
                  <p>Course ID: {course.id}</p>
                  <p>Description: {course.description}</p>
                  <p>Start Date: {course.startDate}</p>
                  <p>Credits: {course.credits}</p>
                </div>
              ))}
            </div>
            <br />
            <a href="/system/admin/students">
              <button>View Students</button>
            </a>
            <br />
            <a href="/system/admin/addCourse">
              <button>Add Course</button>
            </a>
            <br />
            <a href="/system/admin/addStudent">
              <button>Add Student</button>
            </a>
          </div>
          <footer>
            <p>Course Enrollment System &copy; 2024</p>
          </footer>
        </body>
      </>
    );
  }
}

module.exports = AdminDashboard;
