pmb_im.controllers.controller('IntroCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  'ModalService',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService, ModalService) {

    $scope.$on("$ionicView.beforeEnter", function() {
      var backArrow = document.getElementById("back_arrow");
      backArrow.parentNode.removeChild(backArrow);
      console.log("BAck removed");
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
    $state.go("app.cursos");
  }

  $scope.go_to_search = function(){
    $state.go("app.search_centros");
  }

   /*$scope.$on('$ionicView.enter', function(){
   });*/



  }
]);
