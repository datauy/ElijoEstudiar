pmb_im.controllers.controller('FormCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  'DBService',
  '$ionicSlideBoxDelegate',
  '$ionicScrollDelegate',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService, DBService, $ionicSlideBoxDelegate,
  $ionicScrollDelegate) {

    $scope.form = {};
    $scope.form.edad = 16;
    $scope.form.ultimo_nivel_aprobado = "";
    $scope.form.ultimo_anio_aprobado = "";
    $scope.form.plan = "";
    $scope.form.lugar = "";
    $scope.form.turno = "";

    $scope.restarEdad = function(){
      if($scope.form.edad > 4){
        $scope.form.edad = $scope.form.edad - 1;
      }
    };

    $scope.sumarEdad = function(){
      $scope.form.edad = $scope.form.edad + 1;
    };

    $scope.selectUltimoNivel = function(idNivel){
      var x = document.getElementsByClassName("nivel");
      var i;
      for (i = 0; i < x.length; i++) {
          x[i].className = "nivel_"+x[i].id +" nivel hidden";
      }
      var selected = document.getElementById(idNivel);
      selected.className = "nivel_"+selected.id +" nivel";
      $scope.form.ultimo_nivel_aprobado = idNivel;
    }

	  $scope.next = function() {
	    $ionicSlideBoxDelegate.next();
	  };

	  $scope.previous = function() {
	    $ionicSlideBoxDelegate.previous();
	  };

	  $scope.go_to_map = function(){
	    $state.go("app.map");
	  }

  }
]);
