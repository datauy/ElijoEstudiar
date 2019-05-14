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
   mapService.loadPinsLayer = function(establecimientos, scope){
     if(establecimientos!=null){
       //Recorrer los establicimientos y crear los pines
       leafletData.getMap("primary_map").then(function(map) {
         // TODO: Guardar ubicación de usuario???
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
             var html = "<div class='custom_leflet_popup'><div class='popup_wrapper'><b class='text_inside_popup'>"
                         +feature.nombre
                         +"</b><a class='text_inside_popup' ng-click='openDetailsModal(\""
                         +feature.id
                         +"\")'>Ver detalle</a></div>"
                         +"<div ng-click='add_to_fav("
                         +JSON.stringify(feature)
                         +")' class='popup_add_fav'></div></div>";
             var compiled = $compile(html)(scope);
             marker.bindPopup(compiled[0]);
             //marker.bindPopup("<b>"+feature.nombre+"</b>").openPopup();
             map.addLayer(marker);
           }
         })
       })
     }else{
       //console.log("No hay establecimientos cargados");
     }
   }

   return mapService;

 }]);
