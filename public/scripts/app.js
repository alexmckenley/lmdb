angular.module('testApp', ['ngRoute'])

  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainController'
      })
      .when('/404', {
        templateUrl: '/views/404.html'
      })
      .otherwise({
        templateUrl: '/views/main.html',
        controller: 'MainController'
      });
  });