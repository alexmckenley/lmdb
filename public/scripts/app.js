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

  // back-img directive
  .directive('backImg', function(){
    return function(scope, element, attrs){
      
    };
  })

  //SpinnerService
  .service("SpinnerService", function(){
    var opts = {
      lines: 13, // The number of lines to draw
      length: 20, // The length of each line
      width: 10, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };

    var spinner = new Spinner(opts);

    this.spin = function(target){
      target = target || document.getElementsByClassName('theOne')[0];
      console.log("TheOne: ", target);
      spinner.spin(target);
    };

    this.stop = function(target){
      target = target || document.getElementsByClassName('theOne')[0];
      spinner.stop(target);
    };
  })

  // Movie Service
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
        url: 'https://api.themoviedb.org/3/movie/' + id + '?api_key=2dec8cdc29fffb9f1f310dcce80fed41&append_to_response=trailers'
      });
    };

    this.updateMovie = function(movie){
      return $http({
        method: 'PUT',
        url: '/movies/' + movie._id,
        data: movie
      });
    };

    this.refreshMovieData = function(id){
      return $http({
        method: 'GET',
        url: '/movies/' + id + "/update"
      });
    };
  })

  // Frame Controller
  .controller("FrameController", function($scope){
    $scope.source = "/4iJfYYoQzZcONB9hNzg0J0wWyPH.jpg";

    $scope.setBackground = function(movie){
      movie = movie || {backdrop_path: ""};
      console.log("Setting Background");
      angular.element(document.body).css({
        'background-image': 'url(' + 'http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w1920' + movie.backdrop_path +')',
        'background-size' : 'cover'
      });
    };
  })
  .controller("MoviesController", function($scope, $timeout, MovieService, SpinnerService){
    $scope.theOne = null;
    $scope.reverse = false;
    $scope.orderBy = 'date_added';

    MovieService.getMovies().success(function(movies){
      $scope.movies = movies;
      console.log($scope.movies);
    });

    $scope.setTheOne = function(movie){
      if ($scope.theOne === movie){
        // $scope.theOne = null;
        return;
      }
      $scope.theOne = movie;
      $scope.loading = true;
      $timeout(SpinnerService.spin, 0);
      $scope.setBackground(movie);


      MovieService.getMovieDetails(movie.tmdb_id).success(function (info) {
        $scope.details = info;
        $scope.loading = false;

        SpinnerService.stop();
      });

    };

    $scope.order = function(string){
      if($scope.orderBy === string){
        $scope.reverse = !$scope.reverse;
        return;
      }
      $scope.theOne = null;
      $scope.setBackground();
      $scope.orderBy = string;
    };

    $scope.toggleEdit = function(){
      $scope.edit = !$scope.edit;
      console.log("EDIT: ", $scope.edit);
    };

    $scope.updateInfo = function($index, movie){
      SpinnerService.spin();
      MovieService.updateMovie(movie).success(function(data){
        console.log("successfully updated: ", data);
        MovieService.refreshMovieData(data._id).success(function(updatedMovie){
          console.log("Refreshed Movie Data");
          angular.extend(movie, updatedMovie);
          MovieService.getMovieDetails(movie.tmdb_id).success(function (info) {
            angular.extend($scope.details, info);
            $scope.setBackground(movie);
            $scope.loading = false;
            $scope.edit = false;
            SpinnerService.stop();
          }).error(function(err){
            $scope.loading = false;
            console.log(err);
          });
        });
      }).error(function(err){
        console.log("problem updating movie");
      });
    };

  });
















