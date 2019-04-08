pmb_im.controllers.controller('IntroCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService) {

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
    $state.go("app.form");
  }

   /*$scope.$on('$ionicView.enter', function(){
   });*/



  }
]);
