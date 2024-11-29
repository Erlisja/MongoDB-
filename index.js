const express = require('express');
const app = express();
const PORT = 3000;
const methodOverride = require('method-override');


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

app.get('/system', (req, res) => {  
    res.render('Homepage/Home')
});
app.use('/system',signupRoutes);
app.use('/system', userRoutes);


// import authentication
//app.use(require('./middleware/authentication')); 









app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})