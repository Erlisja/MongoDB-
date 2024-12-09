const React = require("react");

class AdminDashboard extends React.Component {
  render() {
    const { courses, users } = this.props;

    return (
      <>
        <head>
          <title>Admin Dashboard</title>
          <link rel="stylesheet" href="/styles/styles.css" />
        </head>
        <body>
          <header>
            <h1>Admin Dashboard</h1>
            {/* logout button */}
            <a href="/system/login">
              <button id="logoutButton" type="button">
                Logout
              </button>
            </a>
          </header>
          <main>
            <section className="admin-dashboard">
              <div className="container-card">
                <h2>Courses</h2>
                <ul>
                  {courses.map((course) => (
                    <li key={course._id}>
                      <h3>
                        <strong>{course.name}</strong>{" "}
                      </h3>
                      <span>{course.description}</span>
                      <form
                        action={`/system/admin/courses/${course._id}?_method=PATCH`}
                        method="POST"
                      >
                        <label className="dashboard-label">
                          Update Description:
                        </label>
                        <input
                          type="text"
                          id={`description-${course.id}`}
                          name="description"
                          defaultValue={course.description}
                          required
                        />
                        <br />
                        <label className="dashboard-label">
                          Update Credits:
                        </label>
                        <input
                          type="number"
                          id={`credits-${course.id}`}
                          name="credits"
                          defaultValue={course.credits}
                          required
                        />
                        <br />
                        <label className="dashboard-label">
                          Update Start Date:
                        </label>
                        <input
                          type="date"
                          id={`startDate-${course.id}`}
                          name="startDate"
                          defaultValue={course.startDate}
                          required
                        />
                        <button type="submit" className="updateBtn">
                          Update
                        </button>
                      </form>
                      {/* Delete button form */}
                      <form
                        action={`/system/admin/courses/${course._id}?_method=DELETE`}
                        method="POST"
                        style={{ display: "inline" }}
                      >
                        <button type="submit" className="updateBtn">
                          Delete Course
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="container-card">
                <h3>Add New Course in the Database</h3>
                <form action="/system/admin/courses" method="POST">
                  <label className="dashboard-label">Course ID:</label>
                  <input type="text" name="course_id" required />
                  <br />

                  <label className="dashboard-label">Course Name:</label>
                  <input type="text" name="name" required />
                  <br />
                  <label className="dashboard-label">Description:</label>
                  <input type="text" name="description" required />
                  <br />
                  <label className="dashboard-label">Credits:</label>
                  <input type="number" name="credits" required />
                  <br />
                  <label className="dashboard-label">Start Date:</label>
                  <input type="date" name="startDate" required />
                  <br />
                  <button type="submit" className="addBtn">
                    Add Course
                  </button>
                </form>
              </div>

              <div className="container-card">
                <h2>Users</h2>
                <ul>
                  {users.map((user) => (
                    <li key={user._id}>
                      <h3>
                        <strong>{user.username}</strong>
                      </h3>{" "}
                      <span> - {user.role}</span>
                      <br />
                      <span>{user.email}</span>
                      <br />
                      <form
                        action={`/system/admin/users/${user._id}?_method=PUT`}
                        method="POST"
                      >
                        <label className="dashboard-label">Update Name:</label>
                        <input
                          type="text"
                          id={`name-${user.id}`}
                          name="username"
                          defaultValue={user.username}
                          required
                        />
                        <br />
                        <label className="dashboard-label">Update Email:</label>
                        <input
                          type="email"
                          id={`email-${user.id}`}
                          name="email"
                          defaultValue={user.email}
                          required
                        />
                        <br />
                        <label className="dashboard-label">Update Role:</label>
                        <select name="role" defaultValue={user.role}>
                          <option value="admin">Admin</option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                        </select>
                        <button type="submit" className="updateBtn">
                          Update
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
          <footer>
            <p>&copy; 2024 Course Enrollment System</p>
          </footer>
        </body>
      </>
    );
  }
}

module.exports = AdminDashboard;
