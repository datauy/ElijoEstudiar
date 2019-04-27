pmb_im.services.factory('ApiService', ['$http', 'ConfigService', function($http, ConfigService) {

  var apiURL = ConfigService.baseURL + "/api/";

/**
   * Constructor, with class name
   */
  function ApiObject(_data) {
    angular.extend(this, _data);
  }


  ApiObject.searchQueEstudiar = function(str){
    return $http.get(apiURL + 'search/' + str, {cache: false, params: {hash_id:Math.random()}});
  }

  ApiObject.searchDondeEstudiar = function(str){
    return $http.get(apiURL + 'searchByLocalidadDepartamento/' + str, {cache: false, params: {hash_id:Math.random()}});
  }

    ApiObject.filters = null;
    ApiObject.mapScope = null;
    ApiObject.formScope = {};
    ApiObject.lastSearchResponseEstablecimientos = null;

    ApiObject.updateFilters = function(filtersObject){
      ApiObject.filters = filtersObject;
      if(ApiObject.mapScope != null){
        ApiObject.mapScope.filtersUpdated();
      }
    }

    ApiObject.createFilterParamsForGetRequest = function(){
      console.log(ApiObject.filters);
      var params = {
        hash_id: Math.random(),
        edad: ApiObject.filters.edad,
        ultimo_nivel_aprobado: ApiObject.filters.ultimo_nivel_aprobado,
        ultimo_anio_aprobado: ApiObject.filters.ultimo_anio_aprobado,
        /*plan: ApiObject.filters.plan,
        lugar: ApiObject.filters.lugar,*/
        turno: ApiObject.filters.turno
      };
      if(ApiObject.filters.que!=""){
        params.queEstudiarId = ApiObject.filters.que.id;
        params.queEstudiarNombre = ApiObject.filters.que.nombre;
        params.queEstudiarTagUno = ApiObject.filters.que.tag[0];
        params.queEstudiarTagDos = ApiObject.filters.que.tag[1];
      }
      if(ApiObject.filters.donde!=""){
        params.dondeEstudiarDepartamento = ApiObject.filters.donde.departamento;
        params.dondeEstudiarLocalidad = ApiObject.filters.donde.localidad;
        params.dondeEstudiarLat = ApiObject.filters.donde.coordenadas.lat;
        params.dondeEstudiarLon = ApiObject.filters.donde.coordenadas.lon;
      }
      if ( ApiObject.filters.que.tipo == 'tipo' ) {
        params = ApiObject.filters.que.id+'/all';
      }
      else {
        params = 'all/'+ApiObject.filters.que.id;
      }
      return params;
    }

    ApiObject.getEstablecimientosByFilters = function(){
      if(ApiObject.filters!=null){
        var parameters = ApiObject.createFilterParamsForGetRequest();
        console.log(parameters);
        return $http.get(apiURL + 'establecimiento-por-tipo/'+parameters);//, {cache: false, params: parameters});
      }
    }

    ApiObject.updateMapPins = function(establecimientos){
      ApiObject.mapScope.loadPinsLayer(establecimientos);
    }


    /**
     * Return the constructor function
     */
    return ApiObject;

}]);
