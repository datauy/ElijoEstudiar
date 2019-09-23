pmb_im.services.factory('ApiService', ['$http', function($http) {

  var apiURL = "/backend/api/";

/**
   * Constructor, with class name
   */
  function ApiObject(_data) {
    angular.extend(this, _data);
  }

  ApiObject.filters = null;
  ApiObject.formScope = {};
  ApiObject.curso = null;

  ApiObject.searchQueEstudiar = function(str){
    return $http.get(apiURL + 'search/' + str);
  }
  ApiObject.searchDondeEstudiar = function(str){
    return $http.get(apiURL + 'ubicaciones?nombre=' + str);//, {cache: false, params: {hash_id:Math.random()}});
  }
  ApiObject.searchEstablecimiento = function(parameters){
    return $http.get(apiURL + 'busca-establecimientos', {cache: false, params: parameters});//, {cache: false, params: {hash_id:Math.random()}});
  }
  ApiObject.createFilterParamsForGetRequest = function(){
    var params = {
      edad: ApiObject.filters.edad,
      tipo: ApiObject.filters.queEstudiar.tipoId,
      nivel: ApiObject.filters.queEstudiar.nivelId,
    };
    if (ApiObject.filters.queEstudie) {
      params.aprobado_tipo = ApiObject.filters.queEstudie.tipoId;
      params.aprobado_nivel = ApiObject.filters.queEstudie.nivelId;
    }
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
    if ( ApiObject.filters.queEstudiar.tipoId != ApiObject.filters.queEstudiar.id ) {
      params.orientacion = ApiObject.filters.queEstudiar.id;
    }

    return params;
  }

  ApiObject.getCursosByFilters = function(){
    if( ApiObject.filters !== undefined && ApiObject.filters != null ){
      parameters = ApiObject.createFilterParamsForGetRequest();
    }
    else {
      return 0;
    }
    return $http.get(apiURL + 'cursos', {cache: false, params: parameters}).then(function (response) {
      if (response.data.is_previa) {
        return response.data;
      }
      else {
        var result = {
          cursos: response.data
        }
        var est = {};
        response.data.forEach(function(curso) {
          for ( var k in curso.oferta ){
            if (curso.oferta.hasOwnProperty(k)) {
              if ( !est.hasOwnProperty(k) ) {
                est[k] = {
                  nombre: curso.oferta[k].nombre,
                  lat: curso.oferta[k].lat,
                  lon: curso.oferta[k].long,
                  id: curso.oferta[k].id,
                }
              }
              //est[k][curso.año]
            }
          }
        });
        result.establecimientos = Object.values(est);
        return result;
      }
    });
  }

  ApiObject.getEstablecimientoById = function(id){
      return $http.get(apiURL + 'establecimientos-por-id/'+id, {cache: false, params: {hash_id:Math.random()}});
  }
  ApiObject.getCursos4Centro = function(id){
    return $http.get(apiURL + 'cursos', {cache: false, params: {centro: id} } ).then(function (response) {
      return { cursos: response.data };
    });
  }
  ApiObject.getSoporte4Centro = function(id){
    return $http.get(apiURL + 'soportes', {cache: false, params: {centro: id} } ).then(function (response) {
      return response.data;
    });
  }
  /**
   * Return the constructor function
   */
  return ApiObject;

}]);
