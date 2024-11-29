const React = require("react");
const { route } = require("../../routes/users");

class SignupFail extends React.Component {
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
                <h1>Sign Up Failed</h1>
            
            </header>
            <div className="container fail">
                <div id="form-div">
                <h2>User with the email already exists.</h2>
                <h3> Please go to login page!</h3>
                <a href="/system/login">
                    <button type="button">Login</button>
                </a>
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
module.exports = SignupFail;