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

  //Moment Filter
  .filter('releaseDate', function(){
    return function(date) {
      return moment(date).format("MMMM Do YYYY");
    };
  })

  .service("MovieService", function($http){
    this.getMovies = function(){
      return $http({
        method: 'GET',
        url: '/movies'
      });
    };

    this.getMovieDetails = function(id){
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=2dec8cdc29fffb9f1f310dcce80fed41'
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
      if ($scope.theOne === movie){
        $scope.theOne = null;
        return;
      }
      console.log("ThE ONE", movie);
      $scope.theOne = movie;
      $scope.loading = true;
      MovieService.getMovieDetails(movie.tmdb_id).success(function (info) {
        $scope.details = info;
        $scope.loading = false;
      });
    };

  });