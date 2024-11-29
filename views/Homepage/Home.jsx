const React = require("react");

class Home extends React.Component {
  render() {
    return (
      <>
        <head>
          <title>Course Enrollment System</title>
          <link rel="stylesheet" href="./styles/styles.css" />
        </head>
        <div className="container">
          <div id="bg-image"></div>
          <div className="content">
            <h1>Welcome to Course Enrollment System</h1> <br />
            <img id="logo" src="./images/Logo.jpg" alt="Logo" />
            < div className = "content headers" >
            <h4>
              Are you already a user? Click below to go to Login Page{" "}
            </h4>{" "}
           
            <a href="/system/login">
              <button type="button" name="loginButton" id="login">
                {" "}
                Login Page
              </button>
            </a>
            <br />
            <h4>Are you a new user? Click below to go to Sign Up Page </h4>{" "}
            <a href="/system/signup">
              <button type="button" name="signupButton" id="signup">
                {" "}
                SignUp Page
              </button>
            </a>
          </div>{" "}
          </div>
        </div>
        <footer>
          <p>Course Enrollment System &copy; 2024</p>
        </footer>
      </>
    );
  }
}

module.exports = Home;
