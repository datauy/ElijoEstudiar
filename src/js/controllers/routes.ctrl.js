pmb_im.controllers.controller('routesController', ['$scope', '$state', 'ApiService', 'MapService', function($scope, $state, ApiService, MapService) {

  $scope.$on("$ionicView.beforeEnter", function() {
    if ($state.current.name == "app.centro" ) {
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

}]);
