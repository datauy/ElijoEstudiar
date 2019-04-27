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
  '$timeout',
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
    ApiService,
    $timeout
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
      document.getElementById("spinner").style.display = "none";
      document.getElementById("pinspinner").style.display = "none";
    });

    /*$scope.$on("$ionicView.afterEnter", function() {
      document.getElementById("map_wrapper").style.display="none";
    });*/

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
      $timeout(function() {
        document.getElementById("map_wrapper").style.display="none";
      },1000);
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
      console.log(establecimientos);
      if(establecimientos!=null){
        //Recorrer los establicimientos y crear los pines
        leafletData.getMap().then(function(map) {
          establecimientos.forEach(function(feature){
            if(feature.lat && feature.lon){
              var markerIcon = L.icon({
                    iconUrl: './img/blue_pin.svg',
                    //shadowUrl: 'leaf-shadow.png',
                    iconSize:     [48, 65], // size of the icon
                    //shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [24, 65], // point of the icon which will correspond to marker's location
                    //shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [0, -65] // point from which the popup should open relative to the iconAnchor
                });
              var marker = L.marker([feature.lat, feature.lon], {icon: markerIcon});
              marker.bindPopup("<b>"+feature.nombre+"</b>").openPopup();
              marker.addTo(map);
            }
          })
        })
      }else{
        //console.log("No hay establecimientos cargados");
      }
    }


  }

]);
