var express = require("express"),
    app = express(),
    router = express.Router(),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    Post = require("./models/blog"),
    Comment = require("./models/comment"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    expressSanitizer = require("express-sanitizer"),
    passportLocalMongoose = require("passport-local-mongoose");

// **************************
//     FETCHING ROUTES
// **************************
var webchurdRoutes = require("./routes/index"),
    blogRoutes = require("./routes/blog"),
    commentsRoutes = require("./routes/comments"),
    adminRoutes = require("./routes/admin")

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/webchurd';

mongoose.connect(databaseUri, { useMongoClient: true })
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));


//body-parser configuration
app.use(bodyParser.urlencoded({ extended: true })); 
// express-sanitizer configuration
app.use(expressSanitizer());

//Serve the public dir
app.use(express.static("public")); 

// ejs configuration
app.set("view engine", "ejs");

// express session configuration
app.use(require("express-session")({
    secret: "zach is a winner ever",
    resave: false,
    saveUninitialized: false
}));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

// passport local configurations
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(webchurdRoutes)
app.use(adminRoutes)
app.use(blogRoutes)

//LISTENING PORT
app.listen(3000, function() {
    console.log("webzy server is listening");
});

 