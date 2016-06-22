var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Posts= mongoose.model('blog');

router.get('/posts',function(req,res,next){
    Posts.find(function(err,posts){
      if(err){return next(err)}
      res.json(posts);
    });
});

router.post('/post',function(req,res,next){
     var Post= new Posts(req.body);
     Post.save(function(err,post){
       if(err){ return next(err) }
        res.json(post);
     });
});



module.exports = router;
