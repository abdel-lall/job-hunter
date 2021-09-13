require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var flash = require('connect-flash');
var passport = require("passport")
var favicon = require('serve-favicon')
var path = require('path')

require("./config/passport")(passport);
var app = express()
var db = require("./models");
// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: "abdel",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");




var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
require("./routes/htmlRoutes")(app);


var PORT = process.env.PORT || 5000;

db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log("listening on port ", PORT)
    });
})