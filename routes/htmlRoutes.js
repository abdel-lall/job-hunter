var db = require("../models");
var axios = require("axios");
var bcrypt = require("bcrypt");
var passport = require("passport");
var checkAuth = require("../config/auth-check");
var authKey = "xUj0Dx32tjRWjF3lLyPlf1UaXHmV7XRNoj9lpzEKmX4=";
var sendEmail = require("../config/sendemail");
const cheerio = require('cheerio');


module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    res.render("landingpage");
  });
  app.get("/signup", function(req, res) {
    res.render("signup");
  });
  app.get("/dashboard", checkAuth, function(req, res) {
    res.render("dashboard", { name: req.user.name });
  });
  app.get("/saved", checkAuth, function(req, res) {
    var id = req.user.id;

    db.savedjob
      .findAll({
        where: { userId: id }
      })
      .then(function(data) {
        data.name = req.user.name;
        console.log(data);
        res.render("saved", { data });
      });
  });
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.get("/passwordreset", function(req, res) {
    res.render("passwordreset");
  });
  app.get("/password/:id*", function(req, res) {
    if (req.params[0] !== "") {
      var pass = req.params.id + req.params[0];
    } else {
      var pass = req.params.id;
    }
    db.user.findOne({ where: { password: pass } }).then(function(userpass) {
      if (userpass == null) {
        res.render("not_found");
      } else {
        res.render("passwordchange");
      }
    });
  });
  app.get("/mainpage", checkAuth,function(req, res) {
    var datasaved=[]
    var datainterview=[]
    var dataapplication=[]
    var dataacceptence=[]
    db.savedjob.findAll( {where : { userId : req.user.id} }).then(function(response){
      response.forEach(function(ele,i){
        if(ele.status == "saved"){
          datasaved.push(ele)
        }
        if(ele.status == "application"){
          dataapplication.push(ele)
        }
        if(ele.status == "interview"){
          datainterview.push(ele)
        }
        if(ele.status == "acceptence"){
          dataacceptence.push(ele)
        }
        
      })

      res.render("mainpage",{datasaved,datainterview,dataacceptence,dataapplication});
    })
    
  });

  app.post("/signup", function(req, res) {
    var { name, email, password, password2 } = req.body;

    db.user.findOne({ where: { email: email } }).then(function(jobHunter) {
      if (jobHunter == null) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) throw err;
            hashedPass = hash;
            var newUser = {
              name: name,
              email: email,
              password: hashedPass
            };
            db.user.create(newUser).then(function(user) {
              res.sendStatus(200);
              console.log("new user added");
            });
          });
        });
      } else {
        res.sendStatus(202);
        console.log("failed to add a new user: email already exist");
      }
    });
  });
  app.post("/", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.send({ message: "success" });
      });
    })(req, res, next);
  });
  app.post("/dashboard/search", function(req, res, next) {
    axios({
      method: "get",
      url:
        "https://data.usajobs.gov/api/search?Keyword=" +
        req.body.keyword +
        "&LocationName=" +
        req.body.location +
        ",",
      headers: {
        host: "data.usajobs.gov",
        "User-Agent": "portfolio.alproductions@gmail.com",
        "Authorization-Key": authKey
      }
    })
      .then(function(response) {
        var resault = {
          data: response.data,
          location: req.body.location
        };
        res.send(resault);
      })
      .catch(function(error) {
        res.send(error);
      });
  });
  app.post("/mainpage/search", function(req, res, next) {
    var { source, location, keyword } = req.body;
    if (source == "USAJobs") {
      axios({
        method: "get",
        url:"https://data.usajobs.gov/api/search?Keyword=" + keyword + "&LocationName=" + location + ",",
        headers: {
          host: "data.usajobs.gov",
          "User-Agent": "portfolio.alproductions@gmail.com",
          "Authorization-Key": authKey
        }
      })
        .then(function(response) {
          var resault = {
            data: response.data.SearchResult.SearchResultItems,
          };
          res.render("job_card_usajobs",{layout: false,resault})
          // res.send(resault)
        })
        .catch(function(error) {
          res.send(error);
        });
    }
    if(source == "Indeed"){
      axios({
        method: "get",
        url:"https://www.indeed.com/jobs?q="+keyword+"&l="+location,
      }).then((response) => {
        if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        var cardarr =[]
        
        $(".jobsearch-SerpJobCard.unifiedRow.row.result").each(function (i, element) {
          
          
          var data ={
            id : $(element).attr("id"),
            title :  $(element).find(".jobtitle.turnstileLink").text(),
            url: `https://www.indeed.com${$(element).find(".jobtitle.turnstileLink").attr("href")}`,
            organisation : $(element).find(".company").text() ? $(element).find(".company").text(): $(element).find(".company >a").text()  ,
            location:$(element).find(".location.accessible-contrast-color-location").text(), 
            description: []
          }
         
          $($(element).find(".summary >ul >li")).each(function (i, element) {
            var line = $(element).html()
            data.description.push(line)
          })
          cardarr.push(data)
        })

        res.render("job_card_indeed",{layout: false,cardarr})

        
        // res.send(cardarr)
    }
    }, (error) => console.log(err) );
    }
  });
  app.post("/mainpage/search/showmore",function(req,res,next){
    var { source, location, keyword,page } = req.body;
    if (source == "USAJobs") {
      axios({
        method: "get",
        url:"https://data.usajobs.gov/api/search?Keyword=" + keyword + "&LocationName=" + location + "&Page=2&ResultsPerPage=10",
        headers: {
          host: "data.usajobs.gov",
          "User-Agent": "portfolio.alproductions@gmail.com",
          "Authorization-Key": authKey
        }
      })
        .then(function(response) {
          var resault = {
            data: response.data.SearchResult.SearchResultItems,
          };
          res.render("job_card_usajobs",{layout: false,resault})
          // res.send(response.data)
        })
        .catch(function(error) {
          res.send(error);
        });
    }
    if(source == "Indeed"){
      axios({
        method: "get",
        url:"https://www.indeed.com/jobs?q="+keyword+"&l="+location+"&start="+page,
      }).then((response) => {
        if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        var cardarr =[]
        
        $(".jobsearch-SerpJobCard.unifiedRow.row.result").each(function (i, element) {
          
          
          var data ={
            id : $(element).attr("id"),
            title :  $(element).find(".jobtitle.turnstileLink").text(),
            url: `https://www.indeed.com${$(element).find(".jobtitle.turnstileLink").attr("href")}`,
            organisation : $(element).find(".company").text() ? $(element).find(".company").text(): $(element).find(".company >a").text()  ,
            location:$(element).find(".location.accessible-contrast-color-location").text(), 
            description: []
          }
         
          $($(element).find(".summary >ul >li")).each(function (i, element) {
            var line = $(element).html()
            data.description.push(line)
          })
          cardarr.push(data)
        })

        res.render("job_card_indeed",{layout: false,cardarr})

        
        // res.send(cardarr)
    }
    }, (error) => console.log(err) );
    }
  })
  app.post("/mainpage/save",function(req,res,next){
    var {id,title,organisation,location,description,url,status} = req.body
   
    if(status == "application"){

      db.savedjob.count({where : {title: title, userId : req.user.id, status: ["application","interview" ,"acceptence"]}}).then(count => {
        console.log(count)
        if (count != 0) {
          res.send("saved already");
        } else {
          db.savedjob
            .create({
              id : id.toString() , 
              title ,  
              employer: organisation,
              location,
              description,
              url,
              status: status,
              userId: req.user.id
            })
            .then(function(jobs) {
              var data={
                id,
                title,
                organisation,
                location,
                description,
                url,
                status,
              }
              if(status == "saved"){
                res.render("savejob",{data});
              }else if(status == "application"){
                res.render("applicationjob",{data});
              }else if(status == "interview"){
                res.render("interviewjob",{data});
            }else if(status == "acceptence"){
              res.render("acceptencejob",{data});
            }
            });
        }
      })
    }
    else{
    db.savedjob.count({where : {id: id, userId : req.user.id,status: status}}).then(count => {
      console.log(count)
      if (count != 0) {
        res.send("saved already");
      } else {
        db.savedjob
          .create({
            id : id.toString() , 
            title ,  
            employer: organisation,
            location,
            description,
            url,
            status: status,
            userId: req.user.id
          })
          .then(function(jobs) {
            var data={
              id,
              title,
              organisation,
              location,
              description,
              url,
              status,
            }
            if(status == "saved"){
              res.render("savejob",{data});
            }else if(status == "application"){
              res.render("applicationjob",{data});
            }else if(status == "interview"){
              res.render("interviewjob",{data});
          }else if(status == "acceptence"){
            res.render("acceptencejob",{data});
          }
          });
      }
    })}
  });
  app.delete("/mainpage/delete/:id", function(req, res, next) {
   
    db.savedjob
      .destroy({
        where: {
          id: req.params.id,
          userId: req.user.id
        }
      })
      .then(function(data) {
        res.send("Job deleted");
      });
  });
  app.post("/dashboard/save/:id", function(req, res, next) {
    db.savedjob.count({ where: { id: req.body.id } }).then(count => {
      if (count != 0) {
        res.send("this Job was already saved");
      } else {
        db.savedjob
          .create({
            id: req.body.id,
            title: req.body.title,
            employer: req.body.employer,
            location: req.body.location,
            description: req.body.description,
            url: req.body.url,
            userId: req.user.id
          })
          .then(function(jobs) {
            res.send("Job saved");
          });
      }
    });
  });
  app.post("/passwordreset", function(req, res) {
    var { email } = req.body;

    db.user.findOne({ where: { email: email } }).then(function(userpass) {
      if (userpass == null) {
        res.send("This Email is not registered");
      } else {
        res.send("success");
        var pass = userpass.dataValues.password;
        sendEmail(
          email,
          "<div style='text-align: center;'><p style='color: blue;font-size: 15px;margin-bottom: 20px;'>Click on the button below to change your jonHunter password</p><a href='http://localhost:5000/password/" +
            pass +
            "' style='border-style: solid;border-width: 1px;border-color: blue;background-color: blue;color: white; font-size: 20px;border-radius: 3px;padding: 4px; text-decoration: none;' >Reset Password</a></div>",
          function(err, res) {
            console.log(err, res);
          }
        );
      }
    });
  });
  app.post("/password/:id", function(req, res) {
    var newpass = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newpass, salt, function(err, hash) {
        if (err) throw err;
        hashedPass = hash;
        db.user
          .update(
            { password: hashedPass },
            { where: { password: req.params.id } }
          )
          .then(function(update) {
            res.sendStatus(200);
          });
      });
    });
  });
  app.delete("/saved/delete/:id", function(req, res, next) {
    db.savedjob
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(data) {
        res.send("Job deleted");
      });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("not_found");
  });
};
