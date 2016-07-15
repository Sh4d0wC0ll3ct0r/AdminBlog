/**
 * Created by oxrl on 7/13/16.
 */

var mongoose = require('mongoose');


module.exports =  mongoose.model('blog',new mongoose.Schema({
    title:  String,
    author: String,
    comments: String,
    fechaPubli:{ type: Date, default: Date.now},
    hidden: Boolean
}));