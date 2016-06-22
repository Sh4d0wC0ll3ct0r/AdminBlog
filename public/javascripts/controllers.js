/**
 * Created by oxrl on 6/19/16.
 */
angular.module('appBlog')
    .controller('ctrlHome',['$scope',function($scope){
        $scope.saludo='Hola Mundo';

    }])
    .controller('ctrlNewFeatures',['$scope',function($scope){
        $scope.saludo2='Hola nuevas caracteristicas';

    }])
    .controller('ctrlMenu',['$scope','$location',function($scope,$location){

         $scope.isActive = function (viewLocation) {
             return viewLocation === $location.path();
         };

}]);