/**
 * Created by oxrl on 6/19/16.
 */
angular.module('appBlog')
    .controller('ctrlHome',['$scope','$state','comun',function($scope,$state,comun){
        //console.log("hola");
        comun.getAll();

        $scope.post = {};
        $scope.posts= comun.posts;

        $scope.getPostxMonth=function(mes){

              comun.getPostxMonth(mes);
              $scope.posts= comun.postsxMonth;
              //console.log(comun.postsxMonth);

        }
    }])
    .controller('ctrlNewFeatures',['$scope',function($scope){
        $scope.saludo2='Hola nuevas caracteristicas';

    }])
    .controller('ctrlMenu',['$scope','$location',function($scope,$location){

         $scope.isActive = function (viewLocation) {
             return viewLocation === $location.path();
         };
        
}])
    .controller('ctrlAdmin',['$scope','$location',function($scope,$location) {

        $scope.error = false;
        $scope.disabled = true;

        comun.login($scope.loginForm.username,$scope.loginForm.password)
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
    }]);