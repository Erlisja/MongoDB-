const React = require("react");

class StudentDashboard extends React.Component {
  render() {
    const { student, enrolledCourses = [], availableCourses = [] } = this.props;

    const today = new Date();

    // Helper function to format dates
    const formatDate = (date) => {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime())
        ? "Invalid Date"
        : parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
    };

    // Filter upcoming and past courses
    const upcomingCourses = enrolledCourses.filter(
      (course) => new Date(course.startDate) > today
    );
    const pastCourses = enrolledCourses.filter(
      (course) => new Date(course.startDate) <= today
    );

    return (
      <>
        <head>
          <title>Course Enrollment System</title>
          <link rel="stylesheet" href="../styles/styles.css" />
        </head>
        <header>
          <h1>Welcome, {student.username}!</h1>
          <a href="/system/login">
            <button id="logoutButton" type="button">
              Logout
            </button>
          </a>
        </header>
        <div className="dashboard-container">
          {/* Upcoming Courses Section */}
          <div className="section upcoming-courses">
          <div className="section courses">
            <h2>Upcoming Courses</h2>
            {upcomingCourses.length > 0 ? (
              <ul>
                {upcomingCourses.map((course) => (
                  <li key={course._id} className="course-item">
                    <div className="course-details">
                      <h3>{course.name}</h3>
                      <p>Starting Date: {formatDate(course.startDate)}</p>
                      <p>Credits: {course.credits}</p>
                    </div>
                    <form action="/system/student?_method=DELETE" method="POST">
                      <input type="hidden" name="courseId" value={course._id} />
                      <button type="submit" className="drop-course">
                        Drop Course
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming courses.</p>
            )}
          </div>

          <div className="section add-courses">
            <h2>Add Courses</h2>
            <form action="/system/student" method="POST">
              <label>Select a course to add:</label>
              <select name="courseId">
                {availableCourses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-course">
                Add Course
              </button>
            </form>
          </div>
          </div>

          {/* Past Courses Section */}
          <div className="section past-courses">
            <h2>Past Courses</h2>
            {pastCourses.length > 0 ? (
              <ul>
                {pastCourses.map((course) => (
                  <li key={course._id} className="course-item">
                    <div className="course-details">
                      <h3>{course.name}</h3>
                      <p>Starting Date: {formatDate(course.startDate)}</p>
                      <p>
                        Ending Date:{" "}
                        {formatDate(
                          new Date(course.startDate).setMonth(
                            new Date(course.startDate).getMonth() + 3
                          )
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No past courses.</p>
            )}
          </div>
        </div>
        <footer>
          <p>Course Enrollment System &copy; 2024</p>
        </footer>
      </>
    );
  }
}

module.exports = StudentDashboard;
