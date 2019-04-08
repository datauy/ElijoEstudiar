pmb_im.services.factory('ApiService', ['$http', 'leafletData','ConfigService', function($http, leafletData, ConfigService) {

  var apiURL = ConfigService.baseURL + "/api/";
/**
   * Constructor, with class name
   */
  function ApiObject(_data) {
    angular.extend(this, _data);
  }


  /*ApiObject.getAllMessagesToUser = function(username,password,uid,author_uid){
    var body = 'user='+username+'&password='+password+'&author_uid='+author_uid+'&uid='+uid+'&hash_id='+Math.random();
    return $http.post(apiURL + 'get_all_messages_to_user', body,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
  }*/

  ApiObject.searchQueEstudiar = function(str){
    return $http.get(apiURL + 'search/' + str, {cache: false, params: {hash_id:Math.random()}});
  }

    ApiObject.current = {};


    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    ApiObject.build = function(_data) {

      return new ApiObject(
        _data
      );
    };


    /**
     * Return the constructor function
     */
    return ApiObject;

}]);
