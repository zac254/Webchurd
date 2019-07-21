var mongoose = require("mongoose");
var Comment = require("../models/comment")

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    author: String,
    tag: String, 
    date: { type: Date, default: Date.now },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


module.exports = mongoose.model("Post", postSchema);