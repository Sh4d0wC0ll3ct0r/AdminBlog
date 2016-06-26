angular.module('appBlog')
    .factory('comun',function($http){

    var comun={};
    comun.posts=[];
    comun.archivos=[];
    comun.getAll= function(){
        return $http.get('/posts')
            .success(function(data){

               for(var i = 0; i < data.length; i++) {
                   data[i].fechaPubli=data[i].fechaPubli.toString().substring(0,10);
                   //comun.archivos[i] ={'mes':data[i].fechaPubli.substring(5,7),'ano':data[i].fechaPubli.substring(0,4)};
                   comun.archivos.push({'mes':data[i].fechaPubli.substring(5,7),'ano':data[i].fechaPubli.substring(0,4)});

                }
                comun.archivos.array.filter(function(){});

             /*  for(var d = 0; d < comun.archivos.length; d++) {

                        if (comun.archivos[d].mes.indexOf()) {
                            delete comun.archivos[j];
                            console.log(comun.archivos[j].mes);
                        }

                }*/

                // delete comun.archivos[0];
                 angular.copy(data,comun.posts);
                 console.log(array);
              //  console.log(comun.archivos[0].mes);


            });
    };

      return comun;
});
