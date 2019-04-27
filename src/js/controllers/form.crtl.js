pmb_im.controllers.controller('FormCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  'ApiService',
  'DBService',
  '$ionicSlideBoxDelegate',
  '$ionicScrollDelegate',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService, ApiService, DBService, $ionicSlideBoxDelegate,
  $ionicScrollDelegate) {

    $scope.form = {};
    $scope.form.edad = 16;
    $scope.form.ultimo_nivel_aprobado = "primaria";
    $scope.form.ultimo_anio_aprobado = "";
    $scope.form.plan = "";
    $scope.form.lugar = "";
    $scope.form.que = "";
    $scope.form.donde = "";
    $scope.form.turno = "matutino";
    $scope.form.SearchQueResults = {};
    $scope.form.SearchDondeResults = {};
    $scope.form.searchQue = "";
    $scope.form.searchDonde = "";
    $scope.form.option = "list";
    $scope.establecimientos = null;

    $scope.restarEdad = function(){
      if(parseInt($scope.form.edad) > 4){
        $scope.form.edad = parseInt($scope.form.edad) - 1;
      }
    };

    $scope.sumarEdad = function(){
      $scope.form.edad = parseInt($scope.form.edad) + 1;
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

    $scope.select_turno = function(idTurno){
      var x = document.getElementsByClassName("turnos");
      var i;
      for (i = 0; i < x.length; i++) {
          x[i].className = "turnos turno_"+ x[i].id +"_off";
      }
      var selected = document.getElementById(idTurno);
      selected.className = "turnos turno_"+ idTurno;
      $scope.form.turno = idTurno;
    }

    $scope.select_option = function(idOption){
      var x = document.getElementsByClassName("options");
      var i;
      for (i = 0; i < x.length; i++) {
          x[i].className = "options option_"+ x[i].id +"_off";
      }
      var selected = document.getElementById(idOption);
      selected.className = "options option_"+ idOption;
      $scope.form.option = idOption;
      if(idOption=="map"){
        document.getElementById("map_wrapper").style.display="block";
        document.getElementById("map_container").style.display="block";
        document.getElementById("map_container").style.visibility="visible";
        document.getElementById("list_container").style.display="none";
        document.getElementById("form_container").style.minHeight="370px";
      }
      if(idOption=="list"){
        document.getElementById("map_wrapper").style.display="none";
        document.getElementById("list_container").style.display="block";
        document.getElementById("map_container").style.visibility="hidden";
        document.getElementById("map_container").style.display="none";
        document.getElementById("form_container").style.minHeight="640px";
      }
    }

    $scope.onSearchChangeQue = function(){
      var search = document.getElementById("que_estudiar");
      var search_str = search.value.trim();
      if(search_str.length>=3){
        ApiService.searchQueEstudiar(search_str).then(function (response) {
          //console.log(response);
          $scope.form.SearchQueResults = response.data;
          document.getElementById("SearchQueResults").style.display = "block";
        });
      }else{
        $scope.hideSearchQueResults();
      }
    }

    $scope.hideSearchQueResults = function(){
      document.getElementById("SearchQueResults").style.display = "none";
    }

    $scope.selectQueEstudiarItem = function(curso){
      $scope.form.que = curso;
      $scope.hideSearchQueResults();
      $scope.form.searchQue = curso.nombre;
    }

    $scope.listAllQueEstudiar = function(){
      var search_str = "api-get-all";
        ApiService.searchQueEstudiar(search_str).then(function (response) {
          //console.log(response);
          $scope.form.SearchQueResults = response.data;
          document.getElementById("SearchQueResults").style.display = "block";
        });
    }

    $scope.onSearchChangeDonde = function(){
      var search = document.getElementById("donde_estudiar");
      var search_str = search.value.trim();
      if(search_str.length>=3){
        ApiService.searchDondeEstudiar(search_str).then(function (response) {
          //console.log(response);
          $scope.form.SearchDondeResults = response.data;
          document.getElementById("SearchDondeResults").style.display = "block";
        });
      }else{
        $scope.hideSearchDondeResults();
      }
    }

    $scope.hideSearchDondeResults = function(){
      document.getElementById("SearchDondeResults").style.display = "none";
    }

    $scope.selectDondeEstudiarItem = function(donde){
      $scope.form.donde = donde;
      $scope.hideSearchDondeResults();
      $scope.form.searchDonde = donde.loc_dep;
    }

    $scope.editSearch = function(){
      $ionicSlideBoxDelegate.previous();
      $ionicSlideBoxDelegate.previous();
    }

	  $scope.next = function() {
	    $ionicSlideBoxDelegate.next();
	  };

	  $scope.previous = function() {
	    $ionicSlideBoxDelegate.previous();
	  };

    $scope.slideHasChanged = function(index){
      $scope.select_option("list");
      if(index==2){
        //index 2 es el slide que tiene el botón del mapa y de el listado
        document.getElementById("map_container").style.display="none";
        ApiService.updateFilters($scope.form);
        if(ApiService.filters!=null){
            ApiService.getEstablecimientosByFilters().then(function (response) {
              console.log(response);
              ApiService.lastSearchResponseEstablecimientos = response.data;
              //EL SERVICIO DE LA API ACTUALIZA AL CONTROLADOR DEL MAPA
              $scope.establecimientos = response.data;
              ApiService.updateMapPins($scope.establecimientos);
            });
            /*if($scope.establecimientos==null){
              //ESTO SE PRECARGA PARA LA REUNION CON ROMANO EN CASO DE QUE NO ESTE LA API QUE RECIBE LOS FILTROS Y DEVUELVE LOS ESTABLECIMIENTOS
               $scope.establecimientos = [
                 {nombre: "Liceo Nº 1", id: 1214, lat: -34.906346, lon: -56.172065 },
                 {nombre: "Liceo Nº 2", id: 2434, lat: -34.902754, lon: -56.164127 },
                 {nombre: "Liceo Nº 7", id: 4324},
                 {nombre: "Liceo Juan Zorrilla", id: 5345}
               ];
               ApiService.updateMapPins($scope.establecimientos);
            }*/
        }
      }
    }

	  /*$scope.go_to_map = function(){
	    $state.go("app.map");
	  }*/

  }
]);
