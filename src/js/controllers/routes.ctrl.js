pmb_im.controllers.controller('routesController', ['$scope', '$state', 'ApiService', 'MapService', function($scope, $state, ApiService, MapService) {

  $scope.params = null;

  $scope.$on("$ionicView.beforeEnter", function() {
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
    if ( $state.current.name == "app.search_cursos" ) {
      if ( angular.equals(ApiService.filters, {}) ) {
        //Saco parámetros de la URL
        console.log($state.params);
        var params = {
          edad: $state.params.edad,
          ultimo_nivel_aprobado: $state.params.ultimo_nivel_aprobado,
          tipo: $state.params.tipoId,
          turnos: $state.params.turnos,
          ubicacion: $state.params.donde,
          orientacion: $state.params.queId
        }
        // TODO: Resolver cómo se levantan los datos
        var search_str = $state.params.edad != 'all' ? $state.params.edad+' años, ' : '' +
          $state.params.ultimo_nivel_aprobado != 'all' ? $state.params.ultimo_nivel_aprobado+', ' : ''+
          $state.params.queId != 'all' ? $state.params.queId+', ' : ''+
          $state.params.donde != 'all' ? $state.params.donde+', ' : ''+
          $state.params.turnos != 'all' ? $state.params.turnos : '';
        $scope.$state.params = params;
        $scope.search_str = search_str;
        ApiService.getCursosByFilters(params).then(function (response) {
          $scope.cursos = response.cursos;
          $scope.establecimientos = response.establecimientos;
          MapService.loadPinsLayer(response.establecimientos, $scope, $state.params.donde);
          document.getElementById("modal-page").style.display="none";
        });
      }
      else {
        $scope.$state.params = ApiService.filters;
      }
    }
  });

}]);
