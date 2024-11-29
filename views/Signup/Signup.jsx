const React = require("react"); 

class Signup extends React.Component {
  render() {
    return (
      <>
        <head>
          <title>Course Enrollment System</title>
          <link rel="stylesheet" href="./styles/styles.css" />
        </head>
        <body>
            <header>
                <h1>Sign Up </h1>
            </header>
            <div className="container">
                <form action="/system/signup" method="POST">
                <label for ="name">Name:</label>
                <input type="text" id="name" name="name" required></input><br></br>
                <label for ="email">Email:</label>
                <input type="email" id="email" name="email" required></input><br></br>
                <label for ="password">Password:</label>
                <input type="password" id="password" name="password" required></input><br></br>
                <label for ="role">Role:</label>
                <select id="role" name="role" required>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Instructor</option>
                    <option value="admin">Admin</option>
                </select><br></br>
                <button type="submit">Sign Up</button>
                </form>
                <br></br>
                <br></br>
                <h3>Already have an account</h3>
                <a href="/system/login">
                <button type="button">Login</button>
                </a>
            </div>
        </body>
        <footer>
          <p>Course Enrollment System &copy; 2024</p>
        </footer>
      </>
    );
  }
}

module.exports = Signup;