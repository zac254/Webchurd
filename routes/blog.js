var express = require("express");
    router = express.Router();


var User = require("../models/user")
var Post = require("../models/blog")
var Comment = require("../models/comment")

// ********************
//  BLOG ROUTES
// ********************

router.get("/blog", function (req, res) {
    // get all blogs from database
    Post.find({}, function (err, posts) {
        if (err) {
            console.log(err);
        } else {
            res.render("blog", { post: posts });
        }
    });
});

router.get("/blog/new", isLoggedIn, function (req, res) {
    res.render("new")
});
router.post("/blog", function (req, res) {
    req.body.title = req.sanitize(req.body.title)
    var title = req.body.title
    var image = req.body.image
    req.body.content = req.sanitize(req.body.content)
    var content = req.body.content
    req.body.author = req.sanitize(req.body.author)
    var author = req.body.author
    req.body.tag = req.sanitize(req.body.tag)
    var tag = req.body.tag
    var newPost = { title: title, image: image, content: content, author: author, tag: tag }
    Post.create(newPost, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/blog");
        }
    })
});

router.get("/blog/about", function(req, res){
    res.render("blogcontact");
})

router.post("/blog/:id", function (req, res) {
    req.body.name = req.sanitize(req.body.name);
    var name = req.body.name
    req.body.email = req.sanitize(req.body.email);
    var email = req.body.email
    req.body.website = req.sanitize(req.body.website);
    var website = req.body.website
    req.body.message = req.sanitize(req.body.message);
    var message = req.body.message
    var newComment = { name: name, email: email, website: website, message: message }
    Comment.create(newComment, function (err, newlyComment) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyComment)
            res.redirect("/blog/:id", { comment: newlyComment })
        }
    });
});

router.get("/blog/:id", function (req, res){
    Post.findById(req.params.id, function (err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.id, function(err, foundComment){
                if (err) {
                    console.log(err);
                } else {
                    res.render("show", {post: foundPost, comment: foundComment})
                }
            })
        }
    });
})




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

module.exports = router;