pmb_im.controllers.controller('AbsController',
['$scope','$state','$cordovaInAppBrowser','$ionicHistory', '$ionicSlideBoxDelegate',
function($scope, $state, $cordovaInAppBrowser, $ionicHistory, $ionicSlideBoxDelegate) {

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
    console.log("going back?"+$ionicSlideBoxDelegate.currentIndex());
    if ( typeof $ionicSlideBoxDelegate.currentIndex() === 'undefined' ) {
      $ionicHistory.goBack();
    }
    else if( $ionicSlideBoxDelegate.currentIndex() > 0 ) {
      $ionicSlideBoxDelegate.previous();
    }
    else {
      $state.go( 'app.intro' );
    }

    console.log('I back');
  };
  $scope.menu_link_open = function() {
    document.getElementById("menu-btn").checked = false;
  }
}]);
