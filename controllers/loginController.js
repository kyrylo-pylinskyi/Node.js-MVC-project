const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//View for Register Page
const registerView = (req, res) => {
    res.render("register", {
    } );
}

//POST request for Register Page

const registerUser = (req, res) => {

    const { name, email, password, location, confirm } = req.body;

    if (!name || !email || !password || !confirm) {
        console.log("Please fill in all fields");
    }

    if (password !== confirm) {
        console.log("Passwords do not match");
    } 
    else{
        User.findOne({ email: email }).then((user) => {
            if (user) {
                console.log("User already exists");
                res.render("register", {
                    name,
                    email,
                    password,
                    confirm
                });
        }
        else {
            const newUser = new User({
                name,
                email,
                location,
                password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((res.redirect("/login")))
                        .catch((err) => console.log(err));
                    });
                });
            }
        });
    }

}

//View for Login Page
const loginView = (req, res) => {

    res.render("login", {
    } );
}

//POST request for Login Page

const loginUser = (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Please fill in all fields");
        res.render("login", {
            email,
            password
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res);
    }
}

module.exports =  {
    registerView,
    loginView,
    registerUser,
    loginUser
};