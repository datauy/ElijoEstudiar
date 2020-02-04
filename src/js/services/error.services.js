pmb_im.services.factory('ErrorService', ['$http','$ionicPopup', '$ionicScrollDelegate', function($http,$ionicPopup, $ionicScrollDelegate) {

  return {

    showError: function (message) {
      $ionicScrollDelegate.scrollTop();
      document.getElementById("error-content").innerHTML = message;
      document.getElementById("error").style.visibility="visible";
    },
    hideError: function (message) {
      console.log('Ejecuta hide');
      $ionicScrollDelegate.scrollTop();
      document.getElementById("error").style.visibility="hidden";
    }
  };
}]);
