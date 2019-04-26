pmb_im.controllers.controller('IntroCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService) {

    $scope.$on("$ionicView.beforeEnter", function() {
      document.getElementById("form_container").style.minHeight = "640px";
    });

    $scope.$on("$ionicView.afterEnter", function() {
      document.getElementById("map_wrapper").style.display="none";
    });


  $scope.geolocate = function() {

      var posOptions = {timeout: 3500, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
          LocationsService.save_initial_position(position);
          $state.go("app.form");
        }, function(err) {
          $state.go("app.form");
        });
    };

  $scope.go_to_form = function(){
    document.getElementById("map_wrapper").style.display="block";
    $state.go("app.form");
  }

  $scope.go_to_search = function(){
    document.getElementById("map_wrapper").style.display="block";
    $state.go("app.search");
  }

   /*$scope.$on('$ionicView.enter', function(){
   });*/



  }
]);
