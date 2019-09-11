pmb_im.controllers.controller('AbsController',
['$scope','$cordovaInAppBrowser','$ionicHistory',
function($scope,$cordovaInAppBrowser, $ionicHistory) {

  $scope.show_error = "hidden";

  $scope.openWebsite = function(url) {
    var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'yes'
    };
    $cordovaInAppBrowser.open(url, '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
    });
  }
  $scope.modalPageClose = function() {
    document.getElementById("modal-page").style.display="none";
  }
  $scope.errorClose = function() {
    document.getElementById("error").style.visibility="hidden";
  }
  $scope.go_back = function() {
    //window.history.back();
    $ionicHistory.goBack();
  };
  $scope.menu_link_open = function() {
    document.getElementById("menu-btn").checked = false;
  }
}]);
