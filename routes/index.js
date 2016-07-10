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

router.get('/post/:mes',function(req,res,next){
     var mes = req.params.mes;

   //  Posts.find({'fechaPubli':{'$gte':'2016-'+mes+'-01'}},function(err,posts){
         Posts.find({'fechaPubli':{'$gte':'2016-'+mes+'-01','$lt':'2016-'+mes+'-31'}},function(err,posts){
             if(err){return next(err)}
                res.json(posts);
         //res.send(posts);
     });
});



router.post('/post',function(req,res,next){
     var Post= new Posts(req.body);
     Post.save(function(err,post){
       if(err){ return next(err) }
        res.json(post);
     });
});

router.get('/login',function(req,res,next){
    res.render('login', { user : req.user });
});

module.exports = router;
