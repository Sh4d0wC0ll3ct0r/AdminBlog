/**
 * Created by oxrl on 6/21/16.
 */
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

module.exports =  mongoose.model('users', new mongoose.Schema({
    username:String,
    password:String,
    is_admin: Boolean,
    login_info: [
        {
            login_time: Date,
            login_ip: String
        }
    ],
    full_name: String,
    position: String,
    address: String,
    motto: String,
    personal_state: String,
    img_url: String

}).plugin(passportLocalMongoose));


