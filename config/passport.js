var localStrategy = require("passport-local").Strategy
var bcrypt = require("bcrypt");
var db = require("../models");

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: "email" }, function (email, password, done) {
        db.user.findOne({ where: { email: email } }).then(function (wishList_db) {
            if (wishList_db == null) {
                return done(null, false, { message: "email not registered" });
            } else {
                bcrypt.compare(password, wishList_db.password, function (err, match) {
                    if (err) throw err;
                    if (match) {
                        return done(null, wishList_db)
                    } else {
                        return done(null, false, { message: "password incorrect" })
                    }
                })
            }
        })
    })
    );
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        db.user.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}

