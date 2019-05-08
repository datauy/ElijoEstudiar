pmb_im.services.factory('ApiService', ['$http', 'ConfigService', function($http, ConfigService) {

  var apiURL = ConfigService.baseURL + "/api/";

/**
   * Constructor, with class name
   */
  function ApiObject(_data) {
    angular.extend(this, _data);
  }

  ApiObject.filters = null;
  ApiObject.formScope = {};
  ApiObject.lastSearchResponseEstablecimientos = null;

  ApiObject.searchQueEstudiar = function(str){
    return $http.get(apiURL + 'search/' + str);
  }
  ApiObject.searchDondeEstudiar = function(str){
    return $http.get(apiURL + 'ubicaciones?nombre=' + str);//, {cache: false, params: {hash_id:Math.random()}});
  }
  ApiObject.updateFilters = function(filtersObject){
    ApiObject.filters = filtersObject;
  }
  ApiObject.createFilterParamsForGetRequest = function(){
      console.log(ApiObject.filters);
      var params = {
        edad: ApiObject.filters.edad,
        ultimo_nivel_aprobado: ApiObject.filters.ultimo_nivel_aprobado,
        tipo: ApiObject.filters.que.tipoId,
        /*ultimo_anio_aprobado: ApiObject.filters.ultimo_anio_aprobado,
        lugar: ApiObject.filters.lugar,*/
      };
      var turnos = [];
      for (var k in ApiObject.filters.turnos){
        if ( ApiObject.filters.turnos[k] === 1 ) {
          turnos.push(k);
        }
      }
      if (turnos.length) {
        params.turnos = turnos.join(",");
      }
      /* TIENE QUE TRAER QUÉ
      if(ApiObject.filters.que!=""){
        params.queEstudiarId = ApiObject.filters.que.id;
        params.queEstudiarNombre = ApiObject.filters.que.nombre;
        params.queEstudiarTagUno = ApiObject.filters.que.tag[0];
        params.queEstudiarTagDos = ApiObject.filters.que.tag[1];
      }*/
      if( ApiObject.filters.donde.lat != "undefined" ){
        params.ubicacion = ApiObject.filters.donde.lat+','+ApiObject.filters.donde.long;
      }
      if ( ApiObject.filters.que.tipoId != ApiObject.filters.que.id ) {
        params.orientacion = ApiObject.filters.que.id;
      }

      return params;
    }

    ApiObject.getEstablecimientosByFilters = function(){
      if(ApiObject.filters!=null){
        var parameters = ApiObject.createFilterParamsForGetRequest();
        console.log(parameters);
        return $http.get(apiURL + 'cursos', {cache: false, params: parameters});
      }
    }

    ApiObject.getEstablecimientoById = function(id){
        return $http.get(apiURL + 'establecimientos-por-id/'+id, {cache: false, params: {hash_id:Math.random()}});
    }
    /**
     * Return the constructor function
     */
    return ApiObject;

}]);
