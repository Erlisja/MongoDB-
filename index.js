const express = require('express');
const app = express();
const PORT = 3000;
const methodOverride = require('method-override');


// import jsx view engine
const jsxViewEngine = require('jsx-view-engine');
app.set('view engine', 'jsx');
app.set('views', './views');

// import body-parser
const bodyParser = require('body-parser');

// import middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// import logger
app.use(require('./middleware/logger'));











app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})