/**
 * Created by oxrl on 6/19/16.
 */
angular.module('appBlog')
    .controller('ctrlHome',['$scope','comun',function($scope,comun){
        //console.log("hola");
        comun.getAll();
        $scope.post = {};

        $scope.posts= comun.posts;
        $scope.archivos=comun.archivos;


        // console.log($scope.archivos);

    }])
    .controller('ctrlNewFeatures',['$scope',function($scope){
        $scope.saludo2='Hola nuevas caracteristicas';

    }])
    .controller('ctrlMenu',['$scope','$location',function($scope,$location){

         $scope.isActive = function (viewLocation) {
             return viewLocation === $location.path();
         };

}]);