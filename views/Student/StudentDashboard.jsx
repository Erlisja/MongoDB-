const React = require("react");

class StudentDashboard extends React.Component {
  render() {
    const { student, enrolledCourses = [], availableCourses = [] } = this.props; // Default empty arrays

    const today = new Date();

    // Filter upcoming and past courses
    const upcomingCourses = enrolledCourses.filter(
      (course) => new Date(course.startDate) > today
    );
    const pastCourses = enrolledCourses.filter(
      (course) => new Date(course.startDate) < today
    );

    return (
      <>
        <head>
          <title>Course Enrollment System</title>
          <link rel="stylesheet" href="../styles/styles.css" />
        </head>

        <div className="dashboard-container">
          <h1>Welcome, {student.name}!</h1>

          {/* Upcoming Courses Section */}
          <div className="section upcoming-courses">
            <div className="section courses">
              <h2>Upcoming Courses</h2>
              {upcomingCourses.length > 0 ? (
                <ul>
                  {upcomingCourses.map((course) => (
                    <li key={course.id} className="course-item">
                      <div className="course-details">
                        <h3>{course.name}</h3>
                        <p>Starting Date: {course.startDate}</p>
                        <p>Credits: {course.credits}</p>
                      </div>
                      {/* Form to drop a course */}
                      <form action="/drop-course" method="DELETE">
                        <input
                          type="hidden"
                          name="courseId"
                          value={course.id}
                        />
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
              {/* Add course form */}
              <form action="/add-course" method="POST">
                <label>Select a course to add:</label>
                <select name="courseId">
                  {availableCourses.map((course) => (
                    <option key={course.id} value={course.id}>
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
                  <li key={course.id} className="course-item">
                    <div className="course-details">
                      <h3>{course.name}</h3>
                      {/* add three months to the start date */}
                      <p>Starting Date: {course.startDate}</p>
                      <p>
                        Ending Date:{" "}
                        {new Date(
                          new Date(course.startDate).setMonth(
                            new Date(course.startDate).getMonth() + 3
                          )
                        ).toISOString().slice(0, 10)}
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
      </>
    );
  }
}

module.exports = StudentDashboard;
