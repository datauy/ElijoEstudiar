 //pmb_im.services.factory('MapService', [ function() {
 pmb_im.services.factory('MapService', ['leafletData', '$compile', '$cordovaGeolocation', function(leafletData, $compile, $cordovaGeolocation) {

   //Definicion de la proyecccion UTM 21 s
   //proj4.defs('EPSG:32721', '+proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');


   var mapService = {};
   mapService.mapScope = null;

   /**
  * Center map on user's current position
  */
  mapService.goToPlace = function(mapName,name,scope) {
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(ubication) {
        mapService.createMarker(mapName,name,scope,[ubication.coords.latitude, ubication.coords.longitude]);
     }, function(err) {
      leafletData.getMap(mapName).then(function(map) {
        map.setView([-32.564420, -56.028243], 6);
        map.on('click', function(e) {
          mapService.createMarker(mapName,name,scope,[e.latlng.lat, e.latlng.lng]);
        });
      });
    });
  }
  mapService.createMarker = function(mapName,name,scope,position) {
    leafletData.getMap(mapName).then(function(map) {
      //Remove layers (other markers)
      map.eachLayer(function (layer) {
        if(layer._url=="undefined" || layer._url==null){
          map.removeLayer(layer);
        }
      });
      var htmlPopUp = "<a ng-click='ubicacion(["+position[0]+","+position[1]+"]);'>"+name+"</a>";
      var compiled = $compile(htmlPopUp)(scope);
      var marker = new L.marker(position, {
        draggable: 'true'
      }).bindPopup(compiled[0]).addTo(map).openPopup();
      marker.on('dragend', function(event) {
        var position = marker.getLatLng();
        var htmlPopUp = "<a ng-click='ubicacion(["+position.lat+","+position.lng+"]);'>"+name+"</a>";
        var compiled = $compile(htmlPopUp)(scope);
        marker.setLatLng(position, {
          draggable: 'true'
        }).bindPopup(compiled[0]).addTo(map).openPopup();
      });
      map.setView(position, 16);
      map.on('click', function(e) {
        mapService.createMarker(mapName,name,scope,[e.latlng.lat, e.latlng.lng]);
      });
   });
  }
  mapService.centerMapOnCoords = function(lat,lng,zoom) {
   leafletData.getMap().then(function(map) {
      map.setView(new L.LatLng(lat, lng),zoom);
     });
   }

   return mapService;

 }]);
