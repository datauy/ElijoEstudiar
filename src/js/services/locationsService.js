pmb_im.services.factory('LocationsService', [ function() {

  var locationsObj = {};
  locationsObj.initial_lat = "";
  locationsObj.initial_lng = "";
  locationsObj.last_user_lat = "";
  locationsObj.last_user_lng = "";
  locationsObj.council_modal = null;
  locationsObj.selected_council = null;

  locationsObj.selectCouncil = function(councilName) {
    locationsObj.selected_council =  councilName;
  }

  locationsObj.save_initial_position = function(position) {
    locationsObj.initial_lat =  position.coords.latitude;
    locationsObj.initial_lng =  position.coords.longitude;
  }

  locationsObj.save_last_user_position = function(lat,lng){
    locationsObj.last_user_lat = lat;
    locationsObj.last_user_lng = lng;
  }

  locationsObj.savedLocations = [];

  return locationsObj;

}]);
