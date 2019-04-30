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
  '$ionicModal',
  'ModalService',
  'ApiService',
  '$timeout',
  '$cordovaInAppBrowser',
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
    $ionicModal,
    ModalService,
    ApiService,
    $timeout,
    $cordovaInAppBrowser
  ) {

    /**
     * Once state loaded, get put map on scope.
     */
    /*$scope.online_user_geo = {};*/
    $scope.baseURL = ConfigService.baseURL;
    $scope.AppName = ConfigService.AppName;
    $scope.one_value_popup = null;
    $scope.myIntervals = new Array();
    $scope.map = null;
    $scope.modal_map = null;
    $scope.establecimiento = [];

    $scope.$on("$ionicView.loaded", function() {
      ModalService.checkNoModalIsOpen();
      //DBService.initDB();
      ApiService.mapScope = $scope;
      $scope.create_online_map();
      document.getElementById("spinner").style.display = "none";
      document.getElementById("pinspinner").style.display = "none";
    });

    $scope.filtersUpdated = function(){
      /*console.log(ApiService.filters);
      $scope.loadPinsLayer();*/
    }


    $scope.create_online_map = function(){
      if($scope.map==null){
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
      }
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

    $scope.loadPinsLayer = function(establecimientos){
      if(establecimientos!=null){
        //Recorrer los establicimientos y crear los pines
        leafletData.getMap("primary_map").then(function(map) {
          map.eachLayer(function(marker) {
             if(marker._url){
             }else{
               map.removeLayer(marker);
             }
          })
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
              map.addLayer(marker);
            }
          })
        })
      }else{
        //console.log("No hay establecimientos cargados");
      }
    }

    $scope.openDetailsModal = function(establecimiento){
      console.log(establecimiento);
      if(establecimiento!=null){
        $scope.establecimiento = establecimiento;
        $ionicModal.fromTemplateUrl('templates/details.html', {
          scope: $scope,
          hardwareBackButtonClose: true,
          animation: 'none',
          //focusFirstInput: true
        }).then(function(modal) {
            //document.getElementById("spinner").style.display = "none";
            ModalService.checkNoModalIsOpen();
            ModalService.activeModal = modal;
            ModalService.activeModal.show();
            L.Map.prototype.panToOffset = function (latlng, offset, options) {
                var x = this.latLngToContainerPoint(latlng).x - offset[0]
                var y = this.latLngToContainerPoint(latlng).y - offset[1]
                var point = this.containerPointToLatLng([x, y])
                return this.setView(point, 18, { pan: options })
            }
            $scope.modal_map = {
              defaults: {
                tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                minZoom: 18,
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
                zoom: 18
              }
            };
            console.log("ESTABLECIMIENTO:");
            console.log($scope.establecimiento);
            leafletData.getMap("secondary_map").then(function(map) {
                  console.log("MAPA SECUNDARIO:");
                  console.log(map);
                  var markerIcon = L.icon({
                        iconUrl: './img/blue_pin.svg',
                        //shadowUrl: 'leaf-shadow.png',
                        iconSize:     [25, 34], // size of the icon
                        //shadowSize:   [50, 64], // size of the shadow
                        iconAnchor:   [12, 34], // point of the icon which will correspond to marker's location
                        //shadowAnchor: [4, 62],  // the same for the shadow
                        popupAnchor:  [0, -34] // point from which the popup should open relative to the iconAnchor
                    });
                  var marker = L.marker([$scope.establecimiento.lat, $scope.establecimiento.long], {icon: markerIcon});
                  marker.bindPopup("<b>"+$scope.establecimiento.title+"</b>").openPopup();
                  map.addLayer(marker);
                  var paddingX = window.innerWidth / 4;
                  map.panToOffset([$scope.establecimiento.lat, $scope.establecimiento.long],[paddingX,25],{});
            })
        });
      }
    }

    $scope.close_modal = function(){
      ModalService.checkNoModalIsOpen();
    }

    $scope.openWebsite = function(url) {
      var options = {
                location: 'no',
                clearcache: 'yes',
                toolbar: 'yes'
            };

     $cordovaInAppBrowser.open(url, '_blank', options)
          .then(function(event) {
            // success
          })
          .catch(function(event) {
            // error
        });
    }


  }

]);
