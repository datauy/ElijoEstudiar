pmb_im.controllers.controller('SearchCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'ModalService',
  'LocationsService',
  'ApiService',
  'MapService',
  'DBService',
  '$ionicSlideBoxDelegate',
  '$ionicScrollDelegate',
  '$ionicHistory',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, ModalService, LocationsService, ApiService, MapService, DBService, $ionicSlideBoxDelegate,
  $ionicScrollDelegate, $ionicHistory) {

    $scope.establecimientos = null;
    $scope.filters_centros = {
      nombre: "",
      subsis: {
      CEIP:true,
      CES:true,
      CETP:true,
      CFE:true
      },
      ubicacion: ""
    };
    $scope.curso = {};
    $scope.shownGroup = {
      planes: false,
      años: false
    };
    $scope.dinamic_filters = {
      planes: {},
      "años": {}
    }
    /*$scope.$on("$ionicView.loaded", function() {
      console.log('VIEW LOADED');
      console.log(ApiService.filters);
    });*/
    $scope.$on("$ionicView.beforeEnter", function() {
      $scope.map = MapService.modal_map;
      // TODO: Acomodar bien
      if ( $state.current.name == "app.search_cursos_result" ) {
        ModalService.openModal('buscando', 'loading');
        var filters = ApiService.filters;
        if ( !filters ) {
          //Saco parámetros de la URL
          // TODO: ACOMODAR PARÁMETROS
          var params = {
            edad: $state.params.edad,
            ultimo_nivel_aprobado: $state.params.ultimo_nivel_aprobado,
            tipo: $state.params.tipo,
            turnos: $state.params.turnos,
            // TODO: Donde debieran de ser lat / long
            ubicacion: $state.params.ubicacion,
            orientacion: $state.params.orientacion
          }
          // TODO: Resolver cómo se levantan los datos
          var search_str = params.edad != 'all' ? params.edad+' años, ' : '';
          search_str += params.ultimo_nivel_aprobado != 'all' ? params.ultimo_nivel_aprobado+', ' : '';
          search_str += 'En mapa, ';
          search_str += params.turnos != 'all' ? $state.params.turnos : '';
          if (params.ubicacion) {
            var ubica = params.ubicacion.split(',');
            filters = {
              donde: {
                lat: ubica[0],
                long: ubica[1],
              }
            }
          }
          $scope.params = params;
          $scope.search_str = search_str;
        }
        else {
          var search_str = filters.edad != '' ? filters.edad+' años, ' : '' ;
            search_str += filters.ultimo_nivel_aprobado != '' ? filters.ultimo_nivel_aprobado+', ' : '';
            for (var k in filters.turnos){
              if ( filters.turnos[k] === 1 ) {
                search_str += k+", ";
              }
            }
            search_str += filters.donde.nombre != '' ? filters.donde.nombre : 'Sin ubicación';
            $scope.search_str = search_str;
        }
        ApiService.getCursosByFilters($scope.params).then(function (response) {
          $scope.cursos = response.cursos;
          //Como si fueran el mismo CURSO, quitar en múltiples SOLO CES?
          // TODO: Arreglar en backend CEIP tema de tipos de curso para jardines
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
              $scope.curso.data.años.options[current_curso.año] = {
                nombre: current_curso.año,
                oferta: current_curso.oferta,
              };
              $scope.dinamic_filters.años[current_curso.año] = true;
            }
          });
          console.log($scope.curso);
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
          console.log($scope.curso);
          $scope.establecimientos = response.establecimientos;
          // TODO: Arreglar con los parámetros
          if ( filters ){
            MapService.loadPinsLayer(response.establecimientos, $scope, filters.donde);
          }
          else {
            MapService.loadPinsLayer(response.establecimientos, $scope);
          }
          document.getElementById("map_wrapper").style.display="none";
          document.getElementById("modal-page").style.display="none";
        });
      }
    });
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
        document.getElementById("map_wrapper").style.display="block";
        document.getElementById("map_wrapper").style.visibility="visible";
        document.getElementById("list_container").style.display="none";
        //MapService.invalidateSize("primary_map");
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
  }
]);
