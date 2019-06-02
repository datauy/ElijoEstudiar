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

    $scope.$on("$ionicView.beforeEnter", function() {
      $scope.map = MapService.modal_map;
      // TODO: Acomodar bien
      console.log('BEFORE ENTER');
      if ( $state.current.name == "app.search_cursos_result" || $state.current.name == "app.search_cursos") {
        ModalService.openModal('buscando', 'loading');
        console.log('NO HAY API?');
        var filters = ApiService.filters;
        if ( !filters ) {
          console.log('NO HAY API');
          //Saco parámetros de la URL
          console.log($state.params);
          // TODO: ACOMODAR PARÁMETROS
          var params = {
            edad: $state.params.edad,
            ultimo_nivel_aprobado: $state.params.ultimo_nivel_aprobado,
            tipo: $state.params.tipoId,
            turnos: $state.params.turnos,
            // TODO: Donde debieran de ser lat / long
            ubicacion: $state.params.donde,
            orientacion: $state.params.queId
          }
          // TODO: Resolver cómo se levantan los datos
          var search_str = params.edad != 'all' ? params.edad+' años, ' : '';
          search_str += params.ultimo_nivel_aprobado != 'all' ? params.ultimo_nivel_aprobado+', ' : '';
          search_str += params.orientacion != 'all' ? params.orientacion+', ' : '';
          search_str += 'En mapa, ';
          search_str += params.turnos != 'all' ? $state.params.turnos : '';
          $scope.params = params;
          $scope.search_str = search_str;
        }
        else {
          var search_str = filters.edad != '' ? filters.edad+' años, ' : '' +
            filters.ultimo_nivel_aprobado != '' ? filters.ultimo_nivel_aprobado+', ' : ''+
            filters.queId != '' ? filters.queId+', ' : ''+
            filters.donde.nombre != '' ? filters.donde.nombre+', ' : ''+
            filters.turnos != '' ? filters.turnos : '';
            $scope.search_str = search_str;
        }
        ApiService.getCursosByFilters($scope.params).then(function (response) {
          console.log('VUELVE DE CURSOS');
          $scope.cursos = response.cursos;
          console.log($scope.cursos);
          //Como si fueran el mismo CURSO, quitar en múltiples SOLO CES?
          $scope.cursos.forEach(function(current_curso){
            console.log(current_curso.field_nivel);
            /*$scope.curso.año = current_curso.año;
            $scope.curso.nivel = current_curso.field_nivel;
            //// TODO: corregir ORIENTACIONES PARA TODOS EN BACKEND
            $scope.curso.tipo = current_curso.field_tipo_curso;
            $scope.curso.orientaci_n = current_curso.field_orientaci_n ? current_curso.field_orientaci_n : current_curso.field_tipo_curso;
            $scope.curso.planes[curso.plan] = {
              oferta: curso.oferta,
              nombre: curso.plan,
              url:  '#'
            };*/
          });
          console.log($scope.curso);
          $scope.establecimientos = response.establecimientos;
          // TODO: Arreglar con los parámetros
          if ( filters ){
            console.log('HAY DONDE');
            MapService.loadPinsLayer(response.establecimientos, $scope, filters.donde);
          }
          else {
            console.log('NO HAY DONDE');
            MapService.loadPinsLayer(response.establecimientos, $scope);
          }
          document.getElementById("modal-page").style.display="none";
        });
      }
    });
    $scope.$on("$ionicView.loaded", function() {
      console.log('VIEW LOADED');
      console.log(ApiService.filters);
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
      console.log($scope.filters_centros);
      console.log(params);
      // TODO: Ordenar en API falta location
      ApiService.searchEstablecimiento(params).then(function (response) {
        $scope.establecimientos = response.data.establecimientos;
        MapService.loadPinsLayer(response.data.establecimientos, $scope);
        document.getElementById("loading-mini").style.display = "none";
        //MapService.invalidateSize();
      });
    }
    $scope.searchSelect = function(id){
      $state.go( "app.centro", {"id": id} );
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
      $state.go( "app.centro", {"id": id} );
    }

    $scope.editSearch = function(){
      console.log('HISTORY');
      //$ionicSlideBoxDelegate.previous();
      //$ionicHistory.goBack()

      $state.go( "app.cursos" );
    }
    $scope.openUrl = function(url) {
      // TODO: Agregar funcion
      console.log('Open: '+url);
    }
  }
]);
