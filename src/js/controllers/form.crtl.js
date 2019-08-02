pmb_im.controllers.controller('FormCtrl', ['$scope', '$state',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  '$ionicModal',
  'LocationsService',
  'ModalService',
  'ApiService',
  'MapService',
  'DBService',
  'ErrorService',
  '$ionicSlideBoxDelegate',
  '$ionicScrollDelegate',
  function($scope, $state, $stateParams, $ionicPlatform, $ionicPopup, $ionicModal, LocationsService, ModalService, ApiService, MapService, DBService, ErrorService, $ionicSlideBoxDelegate,
  $ionicScrollDelegate) {
    $scope.locLastSearch = '';
    $scope.shownGroup = {
      CEIP:true,
      CES:true,
      CETP:true,
      CFE:true
    };

    if ( ApiService.filters != null ) {
      $scope.form = ApiService.filters;
    }
    else {

      $scope.form = {};
      $scope.form.edad = 16;
      $scope.form.SearchQueEstudieResults = {};
      $scope.form.ultimo_nivel_aprobado = "primaria";
      $scope.form.ultimo_anio_aprobado = "";
      $scope.form.plan = "";
      //$scope.form.lugar = "";
      $scope.form.depto = "";
      $scope.form.localidad = "";
      $scope.form.que = {};
      $scope.form.donde = {};
      $scope.form.turnos = {
        "matutino":1,
        "vespertino":1,
        "nocturno":1
      };
      $scope.form.SearchQueResults = {};
      $scope.form.SearchDondeResults = [];
      $scope.form.searchQue = "";
      $scope.form.searchDonde = "";
    }

    $scope.$on("$ionicView.loaded", function() {
      $scope.map = MapService.modal_map;
      //// TODO: Cargar datos en caso que sea de editar búsqueda
      console.log($state.params);
    });

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
          x[i].childNodes[1].style.display = "block";
          x[i].childNodes[3].style.display = "none";
      }
      var selected = document.getElementById(idNivel);
      selected.className = "nivel_"+selected.id +" nivel";
      selected.childNodes[1].style.display = "none";
      selected.childNodes[3].style.display = "block";
      $scope.form.ultimo_nivel_aprobado = idNivel;
    }

    $scope.select_turno = function(idTurno){
      if ($scope.form.turnos[idTurno]) {
        $scope.form.turnos[idTurno] = 0;
      }
      else {
        $scope.form.turnos[idTurno] = 1;
      }
      document.getElementById(idTurno).classList.toggle('selected');;
    }

    $scope.onSearchChangeQue = function(id){
      //delete previous selection
      //$scope.form.que = {};
      var search = document.getElementById(id);
      var search_str = search.value.trim();
      if(search_str.length>=3){
        ModalService.activateLoading(id, 'mini');
        ApiService.searchQueEstudiar(search_str).then(function (response) {
          //console.log(response);
          $scope.form[id+'Results'] = response.data;
          document.getElementById(id+"Results").style.display = "block";
          document.getElementById("loading-mini").style.display = "none";
        });
      }else{
        $scope.hideSearchQueResults(id);
      }
    }

    $scope.hideSearchQueResults = function(id){
      var results = document.getElementById(id+"Results");
      results.style.display = "none";
      //Move back just in case
      document.getElementById("modal-page").style.display="none";
      document.getElementById(id+"Wrapper").appendChild(results);
    }

    $scope.selectQueEstudiarItem = function(curso, id){
      $scope.form[id] = curso;
      $scope.hideSearchQueResults(id);
      $scope.form['search'+id] = curso.nombre;
    }

    $scope.listAllQueEstudiar = function(){
      ModalService.openModal('buscando', 'loading');
      ApiService.searchQueEstudiar("all").then(function (response) {
        console.log(response);
        $scope.form.queEstudiarResults = response.data;
        ModalService.openModal('full', 'queEstudiarResults');
        document.getElementById("loading").style.display = "none";
      });
    }

    $scope.onSearchChangeDonde = function(){
      //delete previous selection
      $scope.form.donde = {};
      var search = document.getElementById("donde_estudiar");
      var search_str = search.value.trim().toUpperCase();
      if(search_str.length>=3){
        ModalService.activateLoading('donde_estudiar', 'mini');
        //Si no está vacío y no cambió las primeras letras
        if ( $scope.form.SearchDondeResults.length > 0 && search_str.includes($scope.locLastSearch) ) {
          //Reverse por problemas de modificación de índices
          for (i = $scope.form.SearchDondeResults.length - 1; i >= 0; --i) {
            if ( !$scope.form.SearchDondeResults[i].nombre.includes(search_str) ) {
              $scope.form.SearchDondeResults.splice(i, 1);
            }
          }
          document.getElementById("loading-mini").style.display = "none";
        }
        else if (!$scope.isActiveSearch){
          $scope.isActiveSearch = 1;
          ApiService.searchDondeEstudiar(search_str).then(function (response) {
            $scope.isActiveSearch = 0;
            $scope.form.SearchDondeResults = response.data;
            document.getElementById("SearchDondeResults").style.display = "block";
            document.getElementById("loading-mini").style.display = "none";
          });
        }
        $scope.locLastSearch = search_str;
      }
      else{
        $scope.hideSearchDondeResults();
      }
    }

    $scope.hideSearchDondeResults = function(){
      document.getElementById("SearchDondeResults").style.display = "none";
    }

    $scope.selectDondeEstudiarItem = function(donde){
      $scope.form.donde = donde;
      $scope.hideSearchDondeResults();
      $scope.form.searchDonde = donde.nombre;
    }

	  $scope.next = function() {
      if ( $ionicSlideBoxDelegate.currentIndex() == 1 && angular.equals($scope.form.queEstudiar, {}) ) {
        ErrorService.showError('Por favor, seleccione un curso de la lista.')
      }
      else {
        $ionicSlideBoxDelegate.next();
        ErrorService.hideError();
      }
	  };

	  $scope.previous = function() {
      ErrorService.hideError();
	    $ionicSlideBoxDelegate.previous();
	  };

    $scope.slideHasChanged = function(index){
      if(index==2){
        ApiService.updateFilters($scope.form);/*.then(function (response) {
          console.log("VUELVE DE UPDATE");
        });*/
        var params = ApiService.createFilterParamsForGetRequest();
        console.log(params);
        $state.go( "app.search_cursos_result", params );
      }
    }
    $scope.openModal = function(style, content) {
      ModalService.openModal(style, content);
      if ( style == "modal-map") {
        MapService.goToPlace("ubicacion_map", "Confirmar", $scope);
      }
    }
    /**
    * Función para cerrar modal de ubicación
    */
    $scope.ubicacion = function(longlat){
      document.getElementById("donde_estudiar").value = "Ubicado en mapa"
      $scope.form.donde = {
        "departamento": "NA",
        "nombre": "Localizado en mapa",
        "lat": longlat[0],
        "long": longlat[1]
      };
      document.getElementById("modal-page").style.display="none";
      document.getElementById("SearchDondeResults").style.display = "none";
    }
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
  }
]);
