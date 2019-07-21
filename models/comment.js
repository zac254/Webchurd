var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    website: String,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);