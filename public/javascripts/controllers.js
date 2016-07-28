/**
 * Created by oxrl on 6/19/16.
 */
angular.module('appBlog')
    .controller('ctrlHome',['$scope','$state','comun',function($scope,$state,comun){
        //console.log("hola");
        comun.getAll();

        $scope.post = {};
        $scope.posts= comun.posts;

        $scope.currentPage = 0;
        $scope.pageSize = 10;


        $scope.getPostxMonth=function(mes){

              comun.getPostxMonth(mes);
              $scope.posts= comun.postsxMonth;
            /*  $location.url('/Login/'+mes);-*/
              //console.log(comun.postsxMonth);
        }
        $scope.numberOfPages = function() {
            return Math.ceil($scope.posts.length / $scope.pageSize);
        };

    }])
    .controller('ctrlNewFeatures',['$scope',function($scope){
        $scope.saludo2='Hola nuevas caracteristicas';

    }])
    .controller('ctrlMenu',['$scope','$location',function($scope,$location){

         $scope.isActive = function (viewLocation) {
             return viewLocation === $location.path();
         };
        
}])
    .controller('ctrlAdmin',['$scope','$location','comun',function($scope,$location,comun) {
        console.log('paso1');
        $scope.error = false;
        $scope.disabled = true;
        $scope.login= function() {
            console.log('paso 2');
            comun.login($scope.loginForm.username, $scope.loginForm.password)
              .then(function () {
                  $location.path('/');
                  $scope.disabled = false;
                  $scope.loginForm = {};
              })
              // handle error
              .catch(function () {
                  $scope.error = true;
                  $scope.errorMessage = "Invalid username and/or password";
                  $scope.disabled = false;
                  $scope.loginForm = {};
              });
      };


    }]);/*.controller('MyCtrl',['$scope',function($scope){

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.numberOfPages = function() {
        return Math.ceil($scope.data.length / $scope.pageSize);
    };
    for (var i = 0; i < 45; i++) {
        $scope.data.push("Item " + i);
    }


}]);*/