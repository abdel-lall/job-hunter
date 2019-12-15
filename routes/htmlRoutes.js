var db = require("../models");
var axios = require("axios")
var bcrypt = require("bcrypt");
var passport = require("passport");
var  checkAuth  = require("../config/auth-check")
var authKey = 'zJU4/Q0nSq4Wpdq4BApgoifaEYS17qC0YUpdHjjzvXA=';    


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
  app.post("/dashboard/search", function(req, res, next) {
    axios({
      method: 'get',
      url: `https://data.usajobs.gov/api/search?Keyword=${req.body.keyword}&LocationName=${req.body.location}`, 
      headers: {         
          "Authorization-Key": authKey   
      }
      }).then(function(response) { 
        var resault = {
          data:response.data,
          location: req.body.location}
      res.send(resault)
    });
  });
  
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render('not_found');
  });

  

}