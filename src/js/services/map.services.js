 //pmb_im.services.factory('MapService', [ function() {
 pmb_im.services.factory('MapService', ['leafletData', '$compile', '$cordovaGeolocation', function(leafletData, $compile, $cordovaGeolocation) {

   //Definicion de la proyecccion UTM 21 s
   //proj4.defs('EPSG:32721', '+proj=utm +zone=21 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs');


   var MapService = {};
   MapService.modal_map = {
     defaults: {
       tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
       minZoom: 6,
       maxZoom: 16,
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
       lat: -32.564420,
       lng: -56.028243,
       zoom: 6
     }
   };
   /**
  * Center map on user's current position
  */
  MapService.goToPlace = function(mapName,name,scope) {
    leafletData.getMap(mapName).then(function(map) {map.invalidateSize();});
    $cordovaGeolocation
      .getCurrentPosition()
      .then(function(ubication) {
        MapService.createMarker(mapName,name,scope,[ubication.coords.latitude, ubication.coords.longitude]);
     }, function(err) {
      leafletData.getMap(mapName).then(function(map) {
        map.invalidateSize();
        map.setView([-32.564420, -56.028243], 6);
        map.on('click', function(e) {
          MapService.createMarker(mapName,name,scope,[e.latlng.lat, e.latlng.lng]);
        });
      });
    });
  }
  MapService.createMarker = function(mapName,name,scope,position) {
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
      map.setView(position, 15);
      map.on('click', function(e) {
        MapService.createMarker(mapName,name,scope,[e.latlng.lat, e.latlng.lng]);
      });
   });
  }
  MapService.centerMapOnCoords = function(lat,lng,zoom) {
   leafletData.getMap().then(function(map) {
      map.setView(new L.LatLng(lat, lng),zoom);
     });
   }
   MapService.loadPinsLayer = function(establecimientos, scope, mainLocation){
     if(establecimientos!=null){
       //Recorrer los establicimientos y crear los pines
       leafletData.getMap("primary_map").then(function(map) {
         map.eachLayer(function(marker) {
            if(marker._url){
            }else{
              map.removeLayer(marker);
            }
         })
         var bounds_arr = [];
         var markerCounter = 0;
         //Ubicación de usuario
         if (mainLocation !== undefined) {
           bounds_arr.push([mainLocation.lat, mainLocation.long]);
           var markerIcon = L.icon({
                 iconUrl: './img/oval.svg',
                 //shadowUrl: 'leaf-shadow.png',
                 iconSize:     [35, 47], // size of the icon
                 //shadowSize:   [50, 64], // size of the shadow
                 iconAnchor:   [17, 47], // point of the icon which will correspond to marker's location
                 //shadowAnchor: [4, 62],  // the same for the shadow
                 popupAnchor:  [0, -34] // point from which the popup should open relative to the iconAnchor
             });
           var marker = L.marker([mainLocation.lat, mainLocation.long], {icon: markerIcon});
           marker.bindPopup("<b>Ubicación elegida</b>").openPopup();
           map.addLayer(marker);
           //map.setView([mainLocation.lat, mainLocation.long], 10);
         }
         console.log('PASA MAIN');
         var markerIcon = L.icon({
           iconUrl: './img/blue_pin.svg',
           //shadowUrl: 'leaf-shadow.png',
           iconSize:     [48, 65], // size of the icon
           shadowSize:   [34, 13], // size of the shadow
           iconAnchor:   [24, 65], // point of the icon which will correspond to marker's location
           //shadowAnchor: [4, 62],  // the same for the shadow
           popupAnchor:  [0, -65] // point from which the popup should open relative to the iconAnchor
         });
         establecimientos.forEach(function(feature){
           if(feature.lat && feature.lon){
             markerCounter = markerCounter + 1;
             //Only bound to first 4
             if ( markerCounter < 5 ) {
               bounds_arr.push([feature.lat, feature.lon]);
             }
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
         });
         if ( markerCounter ) {
           var bounds = new L.LatLngBounds(bounds_arr);
           map.fitBounds(bounds);
           //Resize de map en caso que se requiera
           //map.invalidateSize();
         }
       });
     }else{
       //console.log("No hay establecimientos cargados");
     }
   }

   MapService.getMarker = function(establecimiento){
     L.Map.prototype.panToOffset = function (latlng, offset, options) {
         var x = this.latLngToContainerPoint(latlng).x - offset[0]
         var y = this.latLngToContainerPoint(latlng).y - offset[1]
         var point = this.containerPointToLatLng([x, y])
         return this.setView(point, 18, { pan: options })
     }
     leafletData.getMap("secondary_map").then(function(map) {
           var markerIcon = L.icon({
                 iconUrl: './img/pin.svg',
                 //shadowUrl: 'leaf-shadow.png',
                 iconSize:     [35, 47], // size of the icon
                 //shadowSize:   [50, 64], // size of the shadow
                 iconAnchor:   [17, 47], // point of the icon which will correspond to marker's location
                 //shadowAnchor: [4, 62],  // the same for the shadow
                 popupAnchor:  [0, -34] // point from which the popup should open relative to the iconAnchor
             });
           var marker = L.marker([establecimiento.lat, establecimiento.long], {icon: markerIcon});
           marker.bindPopup("<b>"+establecimiento.title+"</b>").openPopup();
           map.addLayer(marker);
           var paddingX = 0;//window.innerWidth / 4;
           map.setZoom(16);
           map.panToOffset([establecimiento.lat, establecimiento.long],[paddingX,25],{});
     });
   }
   MapService.invalidateSize = function(mapName) {
     leafletData.getMap(mapName).then(function(map) {
       map.invalidateSize();
     });
   }
   
   return MapService;

 }]);
