pmb_im.controllers.controller('AbsController',
['$scope','$state','$cordovaInAppBrowser','$ionicHistory', '$ionicSlideBoxDelegate', 'ErrorService',
function($scope, $state, $cordovaInAppBrowser, $ionicHistory, $ionicSlideBoxDelegate, ErrorService) {

  document.getElementById('menu-share-fb').href = "https://www.facebook.com/sharer/sharer.php?u="+window.location.href;
  document.getElementById('menu-share-tw').href = "https://twitter.com/share?url="+window.location.href;
  document.getElementById('footer-share-fb').href = "https://www.facebook.com/sharer/sharer.php?u="+window.location.href;
  document.getElementById('footer-share-tw').href = "https://twitter.com/share?url="+window.location.href;
  document.getElementById('menu-share-fb').target = "_blank";
  document.getElementById('menu-share-tw').target = "_blank";
  document.getElementById('footer-share-fb').target = "_blank";
  document.getElementById('footer-share-tw').target = "_blank";

  $scope.show_error = "hidden";

  $scope.openWebsite = function(url) {
    if ( url == 'undefined' || url == '' ) {
      ErrorService.showError('Aún no hay información accesible');
      return;
    }
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
    if ( typeof $ionicSlideBoxDelegate.currentIndex() === 'undefined' ) {
      window.history.go(-1);
      return;
    }
    else if( $ionicSlideBoxDelegate.currentIndex() > 0 ) {
      $ionicSlideBoxDelegate.previous();
      return;
    }
    else {
      $state.go( 'app.intro' );
    }
  };
  $scope.menu_link_open = function() {
    document.getElementById("menu-btn").checked = false;
  }
}]);
