var db = require("../models");
var axios = require("axios");
var bcrypt = require("bcrypt");
var passport = require("passport");
var checkAuth = require("../config/auth-check");
var authKey = "xUj0Dx32tjRWjF3lLyPlf1UaXHmV7XRNoj9lpzEKmX4=";
var sendEmail = require("../config/sendemail");
const cheerio = require('cheerio');
const multer = require("multer")
const path = require("path")
var fs = require("fs");
var moment = require("moment")
const imagestorage = multer.diskStorage({
    destination: "./public/uploads/images/",
    filename: function(req, file, cb) {
        cb(null, req.user.id + path.extname(file.originalname))
    }
})
const resumestorage = multer.diskStorage({
    destination: "./public/uploads/resumes/",
    filename: function(req, file, cb) {
        cb(null, req.user.id + path.extname(file.originalname))
    }
})
const uploadimage = multer({
    storage: imagestorage,
}).single("settingsimagename")
const uploadresume = multer({
    storage: resumestorage,
}).single("resumename")

module.exports = function(app) {
    // Load index page

    app.get("/", function(req, res) {
        res.render("landingPage");
    });
    app.get("/signup", function(req, res) {
        res.render("signUp");
    });
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
    app.get("/passwordreset", function(req, res) {
        res.render("passwordReset");
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
                res.render("passwordResetStep2");
            }
        });
    });
    app.get("/home", checkAuth, function(req, res) {
        var user = req.user
        var dataWishlist = []
        var dataInterview = []
        var dataApplication = []
        var dataApproval = []
        db.savedjob.findAll({ where: { userId: req.user.id } }).then(function(response) {

            response.forEach(function(ele, i) {
                if (ele.status == "wishlist") {
                    dataWishlist.push(ele.dataValues)
                }
                if (ele.status == "application") {
                    dataApplication.push(ele.dataValues)
                }
                if (ele.status == "interview") {
                    dataInterview.push(ele.dataValues)
                }
                if (ele.status == "approval") {
                    dataApproval.push(ele.dataValues)
                }

            })

            res.render("home", { dataWishlist, dataInterview, dataApplication, dataApproval, user });
        })
    })

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
    app.post("/home/search", function(req, res, next) {
        var { location, keyword } = req.body;
        axios({
            method: "get",
            url: "https://www.indeed.com/jobs?q=" + keyword + "&l=" + location,
        }).then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                var cardarr = []


                $(".tapItem.fs-unmask").each(function(i, element) {


                    var data = {
                        id: $(element).attr("id"),
                        title: $(element).find(".jobTitle >span").text(),
                        url: `https://www.indeed.com${$(element).attr("href")}`,
                        organisation: $(element).find(".companyName").text() ? $(element).find(".companyName").text() : $(element).find(".companyName >a").text(),
                        location: $(element).find(".companyLocation").text(),
                        description: []
                    }

                    $($(element).find(".job-snippet >ul >li")).each(function(i, element) {
                        var line = $(element).html().replace(/(<([^>]+)>)/ig, "")
                        data.description.push(line)
                    })
                    cardarr.push(data)
                })

                res.render("searchResaultCard", { layout: false, cardarr })
            }
        }, (error) => console.log(err));

    });
    app.post("/home/search/showmore", function(req, res, next) {
        var { location, keyword, page } = req.body;
        axios({
            method: "get",
            url: "https://www.indeed.com/jobs?q=" + keyword + "&l=" + location + "&start=" + page,
        }).then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);
                var cardarr = []


                $(".tapItem.fs-unmask").each(function(i, element) {


                    var data = {
                        id: $(element).attr("id"),
                        title: $(element).find(".jobTitle >span").text(),
                        url: `https://www.indeed.com${$(element).attr("href")}`,
                        organisation: $(element).find(".companyName").text() ? $(element).find(".companyName").text() : $(element).find(".companyName >a").text(),
                        location: $(element).find(".companyLocation").text(),
                        description: []
                    }

                    $($(element).find(".job-snippet >ul >li")).each(function(i, element) {
                        var line = $(element).html()
                        data.description.push(line)
                    })
                    cardarr.push(data)
                })

                res.render("searchResaultCard", { layout: false, cardarr })
            }
        }, (error) => console.log(error));

    })
    app.post("/home/save", function(req, res, next) {
        var { id, title, organisation, location, description, url, status } = req.body
        db.savedjob.count({ where: { id: id, userId: req.user.id, status: status } }).then(count => {
            console.log(count)
            if (count != 0) {
                res.send("saved already");
            } else {
                db.savedjob
                    .create({
                        id: id.toString(),
                        title,
                        employer: organisation,
                        location,
                        description,
                        url,
                        status: status,
                        userId: req.user.id
                    })
                    .then(function(jobs) {
                        var data = {
                            id,
                            title,
                            organisation,
                            location,
                            description,
                            url,
                            status,
                        }
                        if (status == "wishlist") {
                            res.render("wishlistCard", { data });
                        } else if (status == "application") {
                            res.render("applicationCard", { data });
                        } else if (status == "interview") {
                            res.render("interviewCard", { data });
                        } else if (status == "approval") {
                            res.render("approvalCard", { data });
                        }
                    });
            }
        })

    });
    // app.post("/mainpage/editimage", function(req, res, next) {

    //     var directory = "./public/uploads/images/"
    //     fs.readdir(directory, function(err, files) {
    //         var fileexist = false;
    //         var oldfilename;
    //         files.forEach(function(ele) {
    //             var filename = ele.split(".")
    //             if (filename[0] == req.user.id) {
    //                 oldfilename = ele;
    //                 fileexist = true;
    //             }

    //         })
    //         if (fileexist) {
    //             fs.unlink(directory + oldfilename, function(err) {
    //                 if (err) { console.log(err) } else {
    //                     uploadimage(req, res, function(err) {
    //                         if (err) {
    //                             console.log(err)
    //                         } else {
    //                             db.user
    //                                 .update({ image: "uploads/images/" + req.file.filename }, { where: { id: req.user.id } })
    //                                 .then(function(update) {
    //                                     res.send(req.file.filename)
    //                                 });


    //                         }
    //                     })
    //                 }
    //             })
    //         } else {
    //             uploadimage(req, res, function(err) {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     db.user
    //                         .update({ image: "uploads/images/" + req.file.filename }, { where: { id: req.user.id } })
    //                         .then(function(update) {
    //                             res.send(req.file.filename)
    //                         });

    //                 }
    //             })
    //         }




    //     })


    // });
    // app.post("/mainpage/editresume", function(req, res, next) {

    //     var directory = "./public/uploads/resumes/"
    //     fs.readdir(directory, function(err, files) {
    //         var fileexist = false;
    //         var oldfilename;
    //         files.forEach(function(ele) {
    //             var filename = ele.split(".")
    //             if (filename[0] == req.user.id) {
    //                 oldfilename = ele;
    //                 fileexist = true;
    //             }

    //         })
    //         if (fileexist) {
    //             fs.unlink(directory + oldfilename, function(err) {
    //                 if (err) { console.log(err) } else {
    //                     uploadresume(req, res, function(err) {
    //                         if (err) {
    //                             console.log(err)
    //                         } else {
    //                             db.user
    //                                 .update({ resume: "uploads/resumes/" + req.file.filename }, { where: { id: req.user.id } })
    //                                 .then(function(update) {
    //                                     res.send(req.file.filename)
    //                                 });
    //                         }
    //                     })
    //                 }
    //             })
    //         } else {
    //             uploadresume(req, res, function(err) {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     db.user
    //                         .update({ resume: "uploads/resumes/" + req.file.filename }, { where: { id: req.user.id } })
    //                         .then(function(update) {
    //                             res.send(req.file.filename)
    //                         });

    //                 }
    //             })
    //         }




    //     })


    // });
    // app.post("/mainpage/edit", function(req, res, next) {
    //     if (req.body.edit == "username") {
    //         db.user
    //             .update({ name: req.body.value }, { where: { id: req.user.id } })
    //             .then(function(update) {
    //                 res.send("username changed")
    //             });
    //     }
    //     if (req.body.edit == "email") {
    //         db.user
    //             .update({ email: req.body.value }, { where: { id: req.user.id } })
    //             .then(function(update) {
    //                 res.send("email changed")
    //             });
    //     }
    //     if (req.body.edit == "password") {
    //         var newpass = req.body.value
    //         bcrypt.genSalt(10, function(err, salt) {
    //             bcrypt.hash(newpass, salt, function(err, hash) {
    //                 if (err) throw err;
    //                 var hashedPass = hash;
    //                 db.user
    //                     .update({ password: hashedPass }, { where: { id: req.user.id } })
    //                     .then(function(update) {
    //                         res.send("password changed")
    //                     });
    //             });
    //         });
    //     }
    //     if (req.body.edit == "linkedin") {
    //         db.user
    //             .update({ linkedin: req.body.value }, { where: { id: req.user.id } })
    //             .then(function(update) {
    //                 res.send("linkedin changed")
    //             });
    //     }
    //     if (req.body.edit == "github") {
    //         db.user
    //             .update({ github: req.body.value }, { where: { id: req.user.id } })
    //             .then(function(update) {
    //                 res.send("github changed")
    //             });
    //     }
    //     if (req.body.edit == "portfolio") {
    //         db.user
    //             .update({ portfolio: req.body.value }, { where: { id: req.user.id } })
    //             .then(function(update) {
    //                 res.send("portfolio changed")
    //             });
    //     }
    // })
    // app.post("/mainpage/setreminder", function(req, res, next) {
    //     console.log(req.body)
    //     var time = moment(req.body.time).format('MMMM Do YYYY, h:mm a');
    //     db.savedjob.update({ reminder: time }, {
    //             where: {
    //                 userId: req.user.id,
    //                 id: req.body.id
    //             }
    //         })
    //         .then(function(update) {
    //             res.send(time)
    //         });

    // })
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
                    "<div style='text-align: center;'><p style='color: #094384;font-size: 15px;margin-bottom: 20px;'>Click on the button below to change your jonHunter password</p><a href='http://" + req.headers.host + "/password/" +
                    pass +
                    "' style='border-style: solid;border-width: 1px;border-color: blue;background-color: #094384;color: white; font-size: 20px;border-radius: 3px;padding: 6px; text-decoration: none;' >Reset Password</a></div>",
                    function(err, res) {
                        console.log(err, res);
                    }
                );
            }
        });
    });
    // app.post("/password/:id", function(req, res) {
    //     var newpass = req.body.password;
    //     bcrypt.genSalt(10, function(err, salt) {
    //         bcrypt.hash(newpass, salt, function(err, hash) {
    //             if (err) throw err;
    //             hashedPass = hash;
    //             db.user
    //                 .update({ password: hashedPass }, { where: { password: req.params.id } })
    //                 .then(function(update) {
    //                     res.sendStatus(200);
    //                 });
    //         });
    //     });
    // });
    app.delete("/home/delete/:id", function(req, res, next) {

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

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("not_found");
    });
};