var db = require("../models");
var bcrypt = require("bcrypt");
var passport = require("passport");
var  checkAuth  = require("../config/auth-check")


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("landingpage")
  });
  app.get("/signup", function (req, res) {
    res.render("signup")
  });
 


  app.post("/signup", function (req, res) {
    var { name, email, password, password2 } = req.body;


    db.user.findOne({ where: { email: email } }).then(function (jobHunter) {
      if (jobHunter == null) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            hashedPass = hash;
            var newUser = {
              name: name,
              email: email,
              password: hashedPass,
            }
            db.user.create(newUser).then(function (jobHunter) {
              res.sendStatus(200);
              console.log("new user added");
            })
          });
        })
      } else {
        res.sendStatus(202);
        console.log("failed to add a new user: email already exist");
      }
    });
  })
  app.post("/", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.send(info) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({message: "success"});
    });
  })(req, res, next);
});
  app.get("/dashboard", checkAuth , function (req, res) {
    res.render("dashboard", { name: req.user.name });
  });
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render('not_found');
  });

  

}