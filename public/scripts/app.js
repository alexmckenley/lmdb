angular.module('lmdbApp', ['ngRoute'])

  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

    .when('/', {
      templateUrl: '/views/main.html',
      controller: 'MoviesController'
    })
    .when('/404', {
      templateUrl: '/views/404.html'
    })
    .otherwise({
      templateUrl: '/views/main.html',
      controller: 'MainController'
    });
  })
  .service("MovieService", function($http){
    this.getMovies = function(){
      return $http({
        method: 'GET',
        url: '/movies'
      });
    };
  })
  .controller("FrameController", function($scope){

  })
  .controller("MoviesController", function($scope, MovieService){
    $scope.theOne = null;

    MovieService.getMovies().success(function(movies){
      $scope.movies = movies;
      console.log($scope.movies);
    });

    $scope.setTheOne = function(movie){
      console.log("ThE ONE", movie);
      $scope.theOne = movie;
    };

  });