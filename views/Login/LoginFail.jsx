const React = require("react");


class LoginFail extends React.Component {
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
                <h1>Login Failed</h1>
            
            </header>
            <div className="container fail">
                <div id="form-div">
                <h2>{this.props.message}</h2>
                <h3> Please try again or go to the login page!</h3>
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
module.exports = LoginFail;