//Imports
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const { loginCheck } = require('./auth/passport');
const app = express();

dotenv.config();
loginCheck(passport);

//Connect to MongoDB
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, 
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    })
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

//Set View Engine
app.set('view engine', 'ejs');

//BodyParsing
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/login'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Server login link http://localhost:${PORT}/login`);
});