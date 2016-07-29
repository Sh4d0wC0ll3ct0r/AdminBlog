var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var Posts= mongoose.model('posts');
var User =mongoose.model('users');
var bCrypt = require('bcrypt-nodejs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //  res.redirect('/admin/login');
});
router.get('/admin', function(req, res, next) {
    /*res.render('index', { title: 'Express' });*/
    res.redirect('/admin/login');
});


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


router.get('/posts',function(req,res,next){
    Posts.find(function(err,posts){
        if(err){return next(err)}
        res.json(posts);
    });
});

router.get('/admin/login', function(req, res, next) {

    res.render('admin/login');
});


router.get('/admin/dashboard',ensureAuthenticated, function(req, res, next) {
    res.render('admin/dashboard');
});

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/admin/login');
}

router.post('/registrar', function(req, res, next) {
   // console.log(req.username+'-'+req.body.username);
User.findOne({username: req.body.username}, function (err, user) {
    if (err) {
        DO_ERROR_RES(res);
        return next();
    }
    //如果没有数据,则增加is_admin: user.is_admin,
    if (!user) {
        var user_ip = req.headers.host;

       /* var {username, password, is_admin, full_name, position, address, motto, personal_state, img_url} = req.body;*/
            var UserInfo = new User({ username:req.body.username, password:createHash(req.body.password),is_admin:1,login_info:[{ login_time: new Date().getTime().toString(), login_ip: user_ip}],
            full_name:req.body.full_name,position:req.body.position,address:req.body.address,motto:req.body.motto,personal_state:req.body.personal_state,img_url:req.body.img_url});
            res.status(200);
         UserInfo.save(function(err) {
             if (err){
                 console.log('Error in Saving user: '+err);
             }
             console.log('User Registration succesful');
         });
       }
    else{
        console.log('User already exists');
    }

});
});

router.post('/admin/login', passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true }), function(req, res, next) {

    req.session.save(function (err) {
        if (err) {

            return next(err);
        }

        res.redirect('/admin/dashboard');
    });
});
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = router;
