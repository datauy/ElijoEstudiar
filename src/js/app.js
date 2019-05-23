// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'pmb_im' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var pmb_im = {
  controllers: angular.module('pmb_im.controllers', []),
  services: angular.module('pmb_im.services', [])
};

pmb_im.app = angular.module('pmb_im', ['ionic','ionic.wizard','ion-autocomplete','leaflet-directive', 'pmb_im.controllers', 'pmb_im.services', 'ngCordova'])

.constant('ApiImEndpoint', {
  url: 'http://www.montevideo.gub.uy'
})

.constant('ApiDataEndpoint', {
  url: 'http://backend.educacion.thor.datauy.org'
})

.directive('select',function(){ //same as "ngSelect"
    return {
        restrict: 'E',
        scope: false,
        link: function (scope, ele) {
            ele.on('touchmove touchstart',function(e){
                e.stopPropagation();
            })
        }
    }
})


.run(function($ionicPlatform, $rootScope, $cordovaKeyboard) {
  $rootScope.VERSION = window.VERSION;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      //cordova.plugins.Keyboard.disableScroll(true);
    }
    //window.Keyboard.hideKeyboardAccessoryBar(false);
    //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    //$cordovaKeyboard.hideAccessoryBar(false)
    //$cordovaKeyboard.disableScroll(true)
    ionic.Platform.isFullScreen = false;
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider, $ionicConfigProvider) {
  if (ionic.Platform.isAndroid()) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
  }

  $compileProvider.debugInfoEnabled(false);
  //$ionicConfigProvider.scrolling.jsScrolling(true);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
    cache: false,
    url: "/",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AbsController'
  })
  .state('app.intro', {
    cache: false,
    url: "intro",
    views: {
      'menuContent' :{
        templateUrl: "templates/intro.html",
        controller : "IntroCtrl"
      }
    }
  })
  .state('app.cursos', {
    cache: false,
    url: "cursos",
    views: {
      'menuContent' :{
        templateUrl: "templates/form.html",
        controller : "FormCtrl"
      }
    }
  })
  .state('app.search_centros', {
    cache: false,
    url: "centros",
    views: {
      'menuContent' :{
        templateUrl: "templates/search_centros.html",
        controller : "SearchCtrl"
      },
    }
  })
  .state('app.search_cursos', {
    cache: false,
    url: "busco/cursos",
    views: {
      'menuContent' :{
        templateUrl: "templates/search_cursos.html",
        controller : "SearchCtrl"
      }
    }
  })
  .state('app.centro', {
    cache: false,
    url: "centro/:id",
    views: {
      'menuContent' :{
        templateUrl: "templates/details.html",
        controller : "routesController"
      }
    }
  })
  .state('app.search_cursos_result', {
    cache: false,
    url: "busco/cursos/:edad/:ultimo_nivel_aprobado/:tipoId/:turnos/:donde/:queId",
    views: {
      'menuContent' :{
        templateUrl: "templates/search_cursos.html",
        controller : "SearchCtrl"
      }
    }
  })
  .state('app.centros', {
    cache: false,
    url: "busco/centros/:subsis/:ubicacion/:nombre",
    views: {
      'menuContent' :{
        templateUrl: "templates/search_establecimientos.html",
        controller : "SearchCtrl"
      },
    }
  })

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('intro');

});
