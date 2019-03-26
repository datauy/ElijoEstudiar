pmb_im.services.factory('PinService', ['$http', 'leafletData','ConfigService', function($http, leafletData, ConfigService) {

  var pinsURL = ConfigService.baseURL + "/oferta.geojson/-34.828518,-55.951376/MATUTINO";
  var apiURL = ConfigService.baseURL + "/api/"
/**
   * Constructor, with class name
   */
  function Pin(_data) {
    angular.extend(this, _data);
  }


  Pin.getAll = function(){
    return $http.get(pinsURL, {cache: false, params: {hash_id:Math.random()}});
  }

  Pin.sendUserLocation = function(latitude,longitude,username,password,uid){
    var body = 'user='+username+'&password='+password+'&lat='+latitude+'&lon='+longitude+"&uid="+uid;
    return $http.post(apiURL + 'send_user_position', body,{withCredentials: true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

  }


    Pin._all = [];
    Pin.current = {};
    Pin.lastPinsResponse = null;




    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Pin.build = function(_data) {

      return new Pin(
        _data
      );
    };

    Pin.prototype.setLatLng = function (latlng) {

      this.lat = latlng.lat;
      this.lon = latlng.lng;
    };

    /**
     * Return the constructor function
     */
    return Pin;

}]);
