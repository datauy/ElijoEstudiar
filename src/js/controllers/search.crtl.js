pmb_im.controllers.controller('SearchCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  '$ionicModal',
  'ModalService',
  'LocationsService',
  'ApiService',
  'MapService',
  'DBService',
  '$ionicSlideBoxDelegate',
  'ErrorService',
  '$ionicHistory',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, $ionicModal, ModalService, LocationsService, ApiService, MapService, DBService, $ionicSlideBoxDelegate,
  ErrorService, $ionicHistory) {

    ErrorService.hideError();
    $scope.establecimientos = null;
    $scope.filters_centros = {
      nombre: "",
      subsis: {
        "Inicial - Primaria":true,
        "Secundaria":true,
        "UTU":true,
        "Formación en educación":true
      },
      ubicacion: ""
    };
    $scope.curso = {};
    $scope.shownGroup = {
      "Inicial - Primaria":false,
      "Secundaria":false,
      "UTU":false,
      "Formación en educación":false
    };
    $scope.dinamic_filters = {
      planes: {},
      "años": {}
    }
    document.getElementById("back_arrow").style.display = "block";
    /*$scope.$on("$ionicView.loaded", function() {
      console.log('VIEW LOADED');
      console.log(ApiService.filters);
    });*/
    $scope.$on("$ionicView.beforeEnter", function() {
      // TODO: Acomodar bien
      if ( $state.current.name == "app.search_cursos_result" ) {
        ModalService.openModal('buscando', 'loading');
        var filters = ApiService.filters;
        if ( filters == null ) {
          //Saco parámetros de la URL
          var filters = {
            edad: $state.params.edad,
            queEstudiar: {
              tipoId: $state.params.tipo,
              id: $state.params.orientacion
            },
            queEstudie: {tipoId: $state.params.aprobado_tipo},
          }
          if ( $state.params.aprobado_tipo != 'all' ) {
            ApiService.getTipoName($state.params.aprobado_tipo).then(function (response) {
              filters.ultimo_aprobado = response.data[0].name;
            });
          }
          if ($state.params.turnos) {
            filters.turnos = $state.params.turnos.split(",");
          }
          if ($state.params.ubicacion) {
            var ubica = $state.params.ubicacion.split(',');
            if ( !isNaN(ubica[0]) && !isNaN(ubica[1]) ) {
              filters.donde = {
                lat: ubica[0],
                long: ubica[1],
              }
              filters.donde.name = "Ubicado en mapa";
            }
          }
          ApiService.filters = filters;
        }
        ApiService.getCursosByFilters().then(function (response) {
          var search_str = ApiService.filters.edad != '' ? ApiService.filters.edad+' años, ' : '' ;
          search_str += (ApiService.filters.ultimo_aprobado !== undefined && ApiService.filters.ultimo_aprobado != '') ? ApiService.filters.ultimo_aprobado+', ' : 'sin previas, ';
          for (var k in ApiService.filters.turnos){
            if ( ApiService.filters.turnos[k] === 1 ) {
              search_str += k+", ";
            }
          }
          search_str += (ApiService.filters.donde !== undefined && ApiService.filters.donde.nombre !== undefined && ApiService.filters.donde.nombre != '') ? ApiService.filters.donde.nombre : 'sin ubicación';
          $scope.search_str = search_str;
          if (response.is_previa) {
            $scope.showPrevias(response);
          }
          else {
            $scope.showCentros(response);
          }
          //  document.getElementById("map_wrapper").style.display="none";
          document.getElementById("modal-page").style.display="none";
        });
      }
      else if ( $state.current.name == 'app.search_centros' ) {
        $scope.map = MapService.modal_map;
      }
    });

    $scope.showCentros = function(response) {
      $scope.map = MapService.modal_map;
      $scope.cursos = response.cursos;
      //Como si fueran el mismo CURSO, quitar en múltiples SOLO CES?
      $scope.curso = {
        data: {
          planes: {options:{}},
          "años": {options:{}}
        },
        nivel: $scope.cursos[0].field_nivel,
        tipo: $scope.cursos[0].field_tipo_curso,
        orientacion: $scope.cursos[0].field_orientaci_n
      };
      //Filtros dinámicos?
      if ( $scope.cursos.length ) {
        $scope.cursos.forEach(function(current_curso){
          var pid = current_curso.año+'-'+current_curso.plan;
          if ( $scope.curso.data.planes.options[current_curso.plan] === undefined ){
            $scope.curso.data.planes.options[current_curso.plan] = {
              nombre: current_curso.plan,
              oferta: current_curso.oferta,
            };
            if (current_curso.url) {
              $scope.curso.data.planes.options[current_curso.plan].url = current_curso.url;
            }
            $scope.dinamic_filters.planes[current_curso.plan] = true;
          }
          if ( $scope.curso.data.años.options[current_curso.año] === undefined ){
            var title = current_curso.año;
            if (current_curso.año == 0 ) {
              title = 'Todos';
            }
            $scope.curso.data.años.options[current_curso.año] = {
              nombre: title,
              oferta: current_curso.oferta,
            };
            $scope.dinamic_filters.años[current_curso.año] = true;
          }
        });
      }
      if ( Object.entries($scope.curso.data.planes.options).length === 0 ) {
        delete $scope.curso.data.planes;
      }
      else {
        $scope.curso.data.planes = {
          nombre: "Planes",
          key: "planes",
          options: Object.values($scope.curso.data.planes.options)
        };
      }
      if ( Object.entries($scope.curso.data.años.options).length === 0 ) {
        delete $scope.curso.data.años;
      }
      else {
        $scope.curso.data.años = {
          nombre: "Años",
          key: "años",
          options: Object.values($scope.curso.data.años.options)
        };
      }
      $scope.establecimientos = response.establecimientos;
      // TODO: Arreglar con los parámetros
      console.log(ApiService.filters);
      if ( ApiService.filters.donde !== undefined && Object.entries(ApiService.filters.donde).length !== 0 ){
        MapService.loadPinsLayer(response.establecimientos, $scope, ApiService.filters.donde);
      }
      else {
        MapService.loadPinsLayer(response.establecimientos, $scope);
      }
    }
    /**Función de previas */
    $scope.showPrevias = function(response) {
      $scope.hasPrevias = 1;
      $scope.previas = response.list;
      $scope.ultimo_aprobado = response.tipo_aprobado;
      $scope.curso = response.curso;
      /*$state.go('app.previas');
      $ionicModal.fromTemplateUrl('templates/previas.html', {
        scope: $scope,
        hardwareBackButtonClose: true,
        animation: 'none',
        //focusFirstInput: true
      }).then(function(modal) {
        modal.show();
        document.getElementById("modal-page").style.display="none";
      });*/
    }
    /*$scope.$on("$ionicView.loaded", function() {
      document.getElementById("map_wrapper").style.display="none";
    });*/
    // TODO: Manejador dinámico de ofertas
    $scope.onSearchChange = function(){
      ModalService.activateLoading('search_input', 'mini');
      //Process subsis
      var params = {};
      var subsis = [];
      for (var k in $scope.filters_centros.subsis){
        if ( $scope.filters_centros.subsis[k] === true ) {
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
      // TODO: Ordenar en API falta location
      ApiService.searchEstablecimiento(params).then(function (response) {
        $scope.establecimientos = response.data.establecimientos;
        MapService.loadPinsLayer(response.data.establecimientos, $scope);
        document.getElementById("loading-mini").style.display = "none";
        //MapService.invalidateSize();
      });
    }

    $scope.select_option = function(optionId){
      //// TODO: mejorar?
      var x = document.getElementsByClassName("options");
      var i;
      for (i = 0; i < x.length; i++) {
          x[i].className = "options option_"+ x[i].id +"_off";
      }
      var selected = document.getElementById(optionId);
      selected.className = "options option_"+ optionId;
      if(optionId=="map"){
        document.getElementById("map_wrapper").style.position="relative";
        document.getElementById("map_wrapper").style.visibility="visible";
        document.getElementById("map_wrapper").style.display="block";
        document.getElementById("list_container").style.display="none";
        MapService.invalidateSize("primary_map");
      }
      if(optionId=="list"){
        document.getElementById("map_wrapper").style.display="none";
        document.getElementById("list_container").style.display="block";
      }
    }

    $scope.openDetailsModal = function(id) {
      //Guardo el curso elejido
      ApiService.curso = $scope.curso;
      $state.go( "app.centro", {"id": id} );
    }

    $scope.editSearch = function(){
      $state.go( "app.cursos" );
    }
    $scope.selectPlan = function() {
      // TODO: Agregar funcion
      console.log('Filter plans');
    }
    // TODO: Pasar a servicios
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup[group] = false;
      } else {
        $scope.shownGroup[group] = true;
      }
    }
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup[group];
    }
    $scope.selectFilter = function(option) {
      console.log(option);
      console.log($scope.dinamic_filters);
    }
    $scope.selectPrevia = function(curso) {
      // TODO: Cambiar a función local?
      ApiService.filters.queEstudiar.id = curso.id;
      ApiService.filters.queEstudiar.tipoId = curso.tipoId;
      ApiService.filters.queEstudiar.nivelId = curso.nivelId;
      var params = ApiService.createFilterParamsForGetRequest();
      $state.go( "app.search_cursos_result", params );
    }
  }
]);
