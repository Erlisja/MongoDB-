const React = require("react");
const { route } = require("../../routes/users");

class SignupSuccess extends React.Component {
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
                <h1>Sign Up Success</h1>
            
            </header>
            <div className="container signup">
                <div id="form-div">
                <h2>Thank you for signing up!</h2>
                <h3>Click below to go to the login page</h3>
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
module.exports = SignupSuccess;