var express = require("express"),
    mongoose = require("mongoose")
    router = express.Router();
    // app = express();

var User = require("../models/user")
var Post = require("../models/blog")

// WEBCHURD ROUTES
router.get("/", function (req, res) {
    Post.find({}, function(err, post){
        if(err){
            console.log(err)
        } else {
            res.render("home", {post: post});            
        }
    })
});

router.get("/work", function (req, res) {
    res.render("work");
});

router.get("/services", function (req, res) {
    res.render("services");
});

router.get("/about", function (req, res) {
    res.render("about");
});

router.get("/contact", function (req, res) {
    res.render("contact");
});

module.exports = router;