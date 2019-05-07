pmb_im.controllers.controller('AbsController',
['$scope','$cordovaInAppBrowser',
function($scope,$cordovaInAppBrowser) {

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
}]);
