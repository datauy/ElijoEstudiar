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
      // TODO: Acomodar bien
      if ( $state.current.name == "app.search_cursos_result" || $state.current.name == "app.search_cursos") {
        console.log(ApiService.filters);
        ModalService.openModal('buscando', 'loading');
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
          $scope.params = params;
          $scope.search_str = search_str;
        }
        ApiService.getCursosByFilters($scope.params).then(function (response) {
          $scope.cursos = response.cursos;
          $scope.establecimientos = response.establecimientos;
          MapService.loadPinsLayer(response.establecimientos, $scope, $state.params.donde);
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
    $scope.onSearchChange = function(){
      ModalService.activateLoading('search_input', 'mini');
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
      $state.go( "app.cursos", {"status": "po"} );
    }
  }
]);
