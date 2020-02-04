pmb_im.controllers.controller('routesController', ['$scope', '$state', 'ApiService', 'MapService', 'ErrorService', function($scope, $state, ApiService, MapService, ErrorService) {

  $scope.params = null;
  $scope.shownGroup = {
    info: true,
    oferta: false,
    datos: false,
    otros: false
  };
  $scope.cursos = [];
  $scope.soportes = [];
  $scope.$on("$ionicView.beforeEnter", function() {
    document.getElementById("form_container").style.height = 'initial';

    if ( $state.current.name == "app.centro" ) {
      //$scope.openModal('buscando', 'loading');
      ApiService.getEstablecimientoById($state.params.id).then(function (response) {
        // TODO: pasar en la API!!!
        //response.data.establecimientos[0].id = $state.current.name;
        $scope.centro = response.data.establecimientos[0];
        //Levantar cursos async
        $scope.modal_map = MapService.modal_map;
        //Levantar cursos
        var ficha = {
          cat: [],
          mod: ["Presencial"],
          turnos: [],
          niveles: {}
        };
        MapService.getMarker(response.data.establecimientos[0]);
        ApiService.getCursos4Centro($state.params.id).then(function (response) {
          response.cursos.forEach(function(curso){
            if ( curso.field_modalidad && ficha.mod.indexOf(modalidad) == -1 ){
              ficha.mod.push(modalidad);
            }
            if ( curso.field_catgor_a && ficha.cat.indexOf(curso.field_catgor_a) == -1 ){
              ficha.cat.push(curso.field_catgor_a);
            }
            curso.oferta[0].turnos.forEach(function(turno){
              if ( ficha.turnos.indexOf(turno) == -1 ){
                ficha.turnos.push(turno);
              }
            });
            if (ficha.niveles.hasOwnProperty(curso.field_nivel)){
              if ( ficha.niveles[curso.field_nivel].indexOf(curso['año']) == -1 ) {
                ficha.niveles[curso.field_nivel].push(curso['año']);
              }
            }
            else {
              ficha.niveles[curso.field_nivel] = [ curso['año'] ];
            }
          });
          $scope.centro.oferta = {
            turnos: ficha.turnos.join(', '),
            modalidades: ficha.mod.join(', '),
            categoria: ficha.cat.join(', '),
            niveles: [],
          }
          for ( var n in ficha.niveles ){
            $scope.centro.oferta.niveles.push({
              nombre: n,
              grados: ficha.niveles[n].join('ᵒ, ')+'ᵒ'
            });
          }
          $scope.cursos = response.cursos;
          console.log($scope.cursos);
        });
        ApiService.getSoporte4Centro($state.params.id).then(function (response) {
          console.log(response);
          $scope.soportes = response;
        });
        console.log($scope.centro);
        document.getElementById("modal-page").style.display="none";
      });
    }
  });
  ErrorService.hideError();
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
  };

  $scope.isSubGroupShown = function(item) {
    return $scope.shownChild === item;
  };
}]);
