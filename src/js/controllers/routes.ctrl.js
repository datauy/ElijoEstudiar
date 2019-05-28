pmb_im.controllers.controller('routesController', ['$scope', '$state', 'ApiService', 'MapService', function($scope, $state, ApiService, MapService) {

  $scope.params = null;
  $scope.shownGroup = {
    info: true,
    oferta: false,
    datos: false,
    otros: false
  }
  $scope.$on("$ionicView.beforeEnter", function() {
    document.getElementById("form_container").style.height = 'initial';

    if ( $state.current.name == "app.centro" ) {
      //$scope.openModal('buscando', 'loading');
      ApiService.getEstablecimientoById($state.params.id).then(function (response) {
        // TODO: pasar en la API!!!
        response.data.establecimientos[0].id = $state.current.name;
        $scope.establecimiento = response.data.establecimientos[0];
        $scope.modal_map = MapService.modal_map;
        MapService.getMarker(response.data.establecimientos[0]);
        document.getElementById("modal-page").style.display="none";
      });
    }
  });

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup[group] = false;
    } else {
      $scope.shownGroup[group] = true;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup[group];
  };

  $scope.toggleSubGroup = function(item) {
    if ($scope.isSubGroupShown(item)) {
      $scope.shownChild = null;
    } else {
      $scope.shownChild = item;
    }
  }

  $scope.isSubGroupShown = function(item) {
    return $scope.shownChild === item;
  }
}]);
