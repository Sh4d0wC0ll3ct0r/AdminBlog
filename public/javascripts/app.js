/**
 * Created by oxrl on 6/19/16.
 */
angular.module('appBlog',['ui.router']).config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home',
        {
            url:'/home',
            templateUrl:'views/home.html',
            controller:'ctrlHome'

        }).state('newfeatures',{
           url:'/newfeatures',
           templateUrl:'views/newfeatures.html',
           controller:'ctrlNewFeatures'
        });
    $urlRouterProvider.otherwise('home');
});