pmb_im.services.factory('ConfigService', ['$http', function($http) {

  var ConfigObj = {};
  ConfigObj.baseURL = "http://ee_backend.development.datauy.org";
  if(ionic.Platform.isWebView()){
    ConfigObj.baseURL = "http://ee_backend.development.datauy.org";
  } else {
    ConfigObj.baseURL = "/backend";
  }
  ConfigObj.AppName = "Elijo Estudiar";


  return ConfigObj;

}]);
