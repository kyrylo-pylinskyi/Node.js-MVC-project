const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => 
            {
                User.findOne({ email: email })
                    .then((user) => {
                        if (!user) {
                            console.log("wrong email");
                            return done();
                        }
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                console.log("wrong password");
                                return done();
                            }
                        })
                    })
                    .catch((err) => console.log(err));
            })
        );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

module.exports = {
    loginCheck
}