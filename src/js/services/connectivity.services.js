pmb_im.services.factory('ConnectivityService', ['$cordovaNetwork', function($cordovaNetwork){

  return {
    isOnline: function(){
      /*if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
        //return false;
      }*/
      return true;
    },
    isOffline: function(){
      return false;
      /*if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }*/
    }
  }
}])
