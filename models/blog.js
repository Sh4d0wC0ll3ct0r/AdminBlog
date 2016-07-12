/**
 * Created by oxrl on 6/21/16.
 */
var mongoose = require('mongoose');


mongoose.model('blog',new mongoose.Schema({
    title:  String,
    author: String,
    comments: String,
    fechaPubli:{ type: Date, default: Date.now},
    hidden: Boolean
}));

mongoose.model('users', new mongoose.Schema({
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

}));