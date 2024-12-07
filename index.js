const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config(); // import and configure dotenv

// import mongoose
const mongoose = require('mongoose');
const db = require('./db/conn');

// Session setup
// this is the session middleware that will be used to create a session for the user
app.use(session({
    secret: 'SECRET_KEY',  
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  
  }));

  
// import jsx view engine
const jsxViewEngine = require('jsx-view-engine');
app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// import body-parser
const bodyParser = require('body-parser');

// import public folder
app.use(express.static('public'));


// import middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// import logger
app.use(require('./middleware/logger')); // import and use the logger middleware

// import routes
const userRoutes = require('./routes/users');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const studentsRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const adminDashboardRoutes = require('./routes/adminDashboard');
const populateRoute = require('./routes/populate');


app.get('/system', (req, res) => {  
    res.render('Homepage/Home')
});



app.use('/system',signupRoutes);
app.use('/system', userRoutes);
app.use('/system', loginRoutes);
app.use('/system',studentsRoutes);
app.use('/system/admin',adminRoutes);
app.use('/system/admin',adminDashboardRoutes);
app.use('/populate',populateRoute);





// import authentication
app.use(require('./middleware/authentication')); 


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})