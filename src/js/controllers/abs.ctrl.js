pmb_im.controllers.controller('AbsController',
['$scope','$state','$cordovaInAppBrowser','$ionicHistory', '$ionicSlideBoxDelegate',
function($scope, $state, $cordovaInAppBrowser, $ionicHistory, $ionicSlideBoxDelegate) {

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
    else {
      if( $ionicSlideBoxDelegate.currentIndex() > 0 ) {
        $ionicSlideBoxDelegate.previous();
      }
      else {
        $state.go( 'app.intro' );
      }
    }

    console.log('I back');
  };
  $scope.menu_link_open = function() {
    document.getElementById("menu-btn").checked = false;
  }
}]);
