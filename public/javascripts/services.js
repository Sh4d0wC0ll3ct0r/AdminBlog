angular.module('appBlog')
    .factory('comun',['$q', '$timeout','$http',function($q, $timeout,$http){

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
    comun.login= function(username, password){
        console.log('paso 3'+username+'-'+password);
      var deferred = $q.defer();
      return $http.post('/admin/login',{username: username, password: password});
        /*  .success(function (data, status) {
           console.log('paso 6');
              if(status === 200){
                  console.log('ok');
                 // $location.path('../admin/dashboard.ejs');
              } else {
                  console.log('error');
                  //$location.path('../admin/dashboard.ejs');
              }
          })
          // handle error
          .error(function (data) {
              console.log('error OK');
              user = false;
              deferred.reject();
          });

        return deferred.promise;*/
    };
        return comun;
}]);
