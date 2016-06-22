/**
 * Created by oxrl on 6/21/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean
});
*/
var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: String,
    hidden: Boolean
});
mongoose.model('blog',blogSchema);