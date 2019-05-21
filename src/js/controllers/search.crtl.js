pmb_im.controllers.controller('SearchCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  'ApiService',
  'MapService',
  'DBService',
  '$ionicSlideBoxDelegate',
  '$ionicScrollDelegate',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService, ApiService, MapService, DBService, $ionicSlideBoxDelegate,
  $ionicScrollDelegate) {

    $scope.establecimientos = null;
    $scope.filters = {
      nombre: "",
      subsis: {
      CEIP:true,
      CES:true,
      CETP:true,
      CFE:true
      },
      ubicacion: ""
    };
    $scope.$on("$ionicView.beforeEnter", function() {
      $scope.map = MapService.modal_map;
    });

    $scope.onSearchChange = function(){
      //Process subsis
      var params = {};
      var subsis = [];
      for (var k in $scope.filters.subsis){
        if ( $scope.filters.subsis[k] === true ) {
          subsis.push(k);
        }
      }
      if (subsis.length) {
        params.subsis = subsis.join(",");
      }
      //Process nombre
      var search_str = document.getElementById("search_input").value.trim();
      if( search_str.length >= 3 ){
        params.nombre = search_str;
      }
      console.log($scope.filters);
      console.log(params);
      // TODO: Ordenar en API falta location
      ApiService.searchEstablecimiento(params).then(function (response) {
        $scope.establecimientos = response.data.establecimientos;
        MapService.loadPinsLayer(response.data.establecimientos, $scope);
      });
    }
    $scope.searchSelect = function(id){
      $state.go( "app.centro", {"id": id} );
    }

    $scope.select_option = function(optionId){
      MapService.selectOption(optionId);
    }

    $scope.openDetailsModal = function(id) {
      $state.go( "app.centro", {"id": id} );
    }

  }
]);
