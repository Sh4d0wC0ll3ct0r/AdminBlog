angular.module('appBlog')
    .factory('comun',function($http){

    var comun={};
    comun.posts=[];
    comun.postsxMonth=[];
    comun.getAll= function(){
        return $http.get('/posts')
            .success(function(data){

               for(var i = 0; i < data.length; i++) {
                   data[i].fechaPubli=data[i].fechaPubli.toString().substring(0,10);
                   //comun.archivos.push({'mes':data[i].fechaPubli.substring(5,7),'ano':data[i].fechaPubli.substring(0,4)});
                }
                console.log(data);
                 angular.copy(data,comun.posts);
            });
    };
    comun.getPostxMonth= function(mes){
      return $http.get('/post/'+mes).
              success(function(data){
                  for(var i = 0; i < data.length; i++) {
                      data[i].fechaPubli=data[i].fechaPubli.toString().substring(0,10);
                      //comun.archivos.push({'mes':data[i].fechaPubli.substring(5,7),'ano':data[i].fechaPubli.substring(0,4)});
                  }
                    console.log(data);
                    angular.copy(data,comun.postsxMonth);
               });
    };
      return comun;
});
