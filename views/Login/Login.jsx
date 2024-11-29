const React = require("react");

class Login extends React.Component {
  render() {
    return (
      <>
        <head>
          <title>Course Enrollment System</title>
          <link rel="stylesheet" href="../styles/styles.css" />
        </head>
        <body>
          <header>
              <a href="/system">
              <button id='backButton' type="button">Back</button>
            </a>
            <h1>Login </h1>
          
          </header>
          <div className="container signup">
            <div id="form-div">
              <form action="/system/login" method="POST">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required></input>
                <br></br>
                <label for="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                ></input>
                <br></br>
                <br></br>
                <button type="submit">Login</button>
                <br></br>
            <br></br>
            <h3>New User?Register:</h3>
            <a href="/system/signup">
              <button type="button">SignUp</button>
            </a>
              </form>
            </div>
            
          </div>
           <footer>
          <p>Course Enrollment System &copy; 2024</p>
        </footer>
        </body>
       
      </>
    );
  }
}

module.exports = Login;