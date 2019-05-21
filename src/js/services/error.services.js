pmb_im.services.factory('ErrorService', ['$http','$ionicPopup', function($http,$ionicPopup) {

  return {

    showError: function (message) {
      document.getElementById("error-content").innerHTML = message;
      document.getElementById("error").style.visibility="visible";
    },
    hideError: function (message) {
      document.getElementById("error").style.visibility="hidden";
    }
  };
}]);
