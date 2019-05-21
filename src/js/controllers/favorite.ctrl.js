pmb_im.controllers.controller('MapController', ['$scope', function( $scope ) {

  $scope.favs_map = null;

  $scope.viewFavs = function(){
    $ionicModal.fromTemplateUrl('templates/favs.html', {
      scope: $scope,
      hardwareBackButtonClose: true,
      animation: 'none',
      //focusFirstInput: true
    }).then(function(modal) {
        //document.getElementById("spinner").style.display = "none";
        ModalService.checkNoModalIsOpen();
        ModalService.activeModal = modal;
        ModalService.activeModal.show();
        $scope.favs_map = {
          defaults: {
            tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            minZoom: 15,
            maxZoom: 18,
            //zoomControlPosition: 'topleft',
            zoomControl: false,
            //dragging: false,
          },
          markers: {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          },
          center: {
            lat: -34.901113,
            lng: -56.164531,
            zoom: 16
          }
        };
        leafletData.getMap("favs_map").then(function(map) {
          //TODO: ACA TENGO QUE LEVANTAR LOS FAVS DE POUCH DB Y AGREGARLOS AL MAPA Y AL LISTADO
        })
    });
  }

  $scope.add_to_fav = function(establecimiento){
    //TODO: ACA TENGO QUE GUARDAR EL FAV EN POUCH DB
    MapService.mapScope.viewFavs();
  }
}]);
