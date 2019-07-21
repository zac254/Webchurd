var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Post = require("../models/blog");

// *******************
//     ADMIN ROUTES
// *******************
router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    // req.body.username
    // req.body.password
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/adminlogin");
            });
        }
    });
});

router.get("/hybridadministrator", isLoggedIn, function (req, res) {
    res.render("hybridadmin")
});

router.get("/adminlogin", function (req, res) {
    res.render("adminlogin");
});
router.post("/adminlogin", passport.authenticate("local", {
    successRedirect: "/hybridadministrator",
    failureRedirect: "/adminlogin"
}), function (req, res) {
});
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/');
});

// ************************
//    MIDDLEWARES
// ************************
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;