var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Blog= mongoose.model('blog');

router.get('/blog',function(req,res,next){
    Blog.find(function(err,blog){
      if(err){return next(err)}
      res.json(blog);
    });
});

module.exports = router;
