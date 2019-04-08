pmb_im.controllers.controller('MapController', [
  '$scope',
  '_',
  '$cordovaGeolocation',
  'leafletData',
  'ConfigService',
  'PinService',
  '$interval',
  '$location',
  'MapService',
  'ModalService',
  'ApiService',
  function(
    $scope,
    _,
    $cordovaGeolocation,
    leafletData,
    ConfigService,
    PinService,
    $interval,
    $location,
    MapService,
    ModalService,
    ApiService
  ) {

    /**
     * Once state loaded, get put map on scope.
     */
    /*$scope.online_user_geo = {};
    $scope.online_user_geo_array = new Array();*/
    $scope.baseURL = ConfigService.baseURL;
    $scope.AppName = ConfigService.AppName;
    $scope.one_value_popup = null;
    $scope.myIntervals = new Array();

    $scope.$on("$ionicView.beforeEnter", function() {
      ModalService.checkNoModalIsOpen();
      //DBService.initDB();
      ApiService.mapScope = $scope;
      $scope.create_online_map();
    });

    $scope.$on("$ionicView.afterEnter", function() {
    	document.getElementById("spinner").style.display = "none";
      document.getElementById("pinspinner").style.display = "none";
    });

    $scope.filtersUpdated = function(){
      console.log(ApiService.filters);
      $scope.loadPinsLayer();
    }


    $scope.create_online_map = function(){
      $scope.map = {
        defaults: {
          tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          minZoom: 1,
          maxZoom: 18,
          zoomControlPosition: 'topleft',
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
      /*leafletData.getMap().then(function(map) {
        map.on('moveend', $scope.hideOffScreenPins);
      });*/
    };



      /**
     * Center map on user's current position
     */
    $scope.locate = function() {

      $cordovaGeolocation
        .getCurrentPosition()
        .then(function(position) {
          $scope.map.center.lat = position.coords.latitude;
          $scope.map.center.lng = position.coords.longitude;
          $scope.map.center.zoom = 15;

          $scope.map.markers.now = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            message: "Estás aquí",
            focus: true,
            draggable: false
          };

        }, function(err) {
          // error
          //console.log("Location error!");
          //console.log(err);
        });

    };



    $scope.hideOffScreenPins = function() {
      /*leafletData.getMap().then(function(map) {
        var mapBounds = map.getBounds();
        $scope.usersVisible = [];
          $scope.online_user_geo_array.forEach(function(layer,key){
            var shouldBeVisible = mapBounds.contains(layer.getLatLng());
            if (!shouldBeVisible) {
                map.removeLayer(layer);
            } else if (shouldBeVisible) {
                map.addLayer(layer);
                $scope.usersVisible.push(layer.feature);
            }
          })
      });*/
    }

    $scope.loadPinsLayer = function(establecimientos){
      if(establecimientos!=null){
        //Recorrer los establicimientos y crear los pines
      }else{
        console.log("No hay establecimientos cargados");
      }
        /*document.getElementById("spinner").style.display = "block";
        leafletData.getMap().then(function(map) {
          PinService.getAll().then(function (response) {
            if(PinService.lastPinsResponse==null || (PinService.lastPinsResponse && PinService.lastPinsResponse!=response)){
              if($scope.online_user_geo_array){
                $scope.usersVisible = [];
                $scope.online_user_geo_array.forEach(function(layer,key){
                  map.removeLayer(layer);
                })
              }
              PinService.lastPinsResponse = response;
              $scope.reportsByState = {};
              var pinsArray = response.data.features;
              $scope.online_users_geo = response.data.features;
              pinsArray.forEach(function(feature){
                if (feature.properties) {
                    var lon = feature.geometry.coordinates[0];
                    var lat = feature.geometry.coordinates[1];
                    if(lon&&lat){
                      var onlineStatus = feature.properties.Online_status;
                      var icon = feature.properties.Icon;
                      if(icon=="anon"){
                        icon = "./img/icon-user-anonymous.png";
                      }
                      var icon_shadow = './img/generic_pin_red.png';
                      if(onlineStatus=="Online"){
                        icon_shadow = './img/generic_pin_green.png';
                      }
                      var markerIcon = L.icon({
                        shadowUrl: icon_shadow,
                        shadowSize:   [100, 138],
                        shadowAnchor: [44, 138],
                        iconUrl: icon,
                        iconSize: [46, 46],
                        iconAnchor: [24, 120],
                        popupAnchor: [0, -138]
                      });
                      var layer = L.marker([lat, lon], {icon: markerIcon});
                      layer.feature = feature;
                      $scope.online_user_geo_array[layer.feature.properties.Uid] = layer;
                      if (feature.properties) {
			//ACA SETEAR EL ONCLICK PARA LOS PINES (se puede abrir popup en el mapa o levantar un modal o lo que quieran)
                      }
                    }
                  }
              });
              document.getElementById("spinner").style.display = "none";
              $scope.hideOffScreenPins();
            }
          });

        });*/
    }


  }

]);
