pmb_im.controllers.controller('SearchCtrl', ['$scope', '$state',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicPlatform',
  '$ionicPopup',
  'LocationsService',
  'ApiService',
  'DBService',
  '$ionicSlideBoxDelegate',
  '$ionicScrollDelegate',
  function($scope, $state, $cordovaGeolocation, $stateParams, $ionicPlatform, $ionicPopup, LocationsService, ApiService, DBService, $ionicSlideBoxDelegate,
  $ionicScrollDelegate) {

    $scope.nombre = '';
    $scope.establecimientos = null;

    $scope.$on("$ionicView.beforeEnter", function() {
      document.getElementById("form_container").style.minHeight = "460px";
    });

    $scope.onSearchChange = function(){
      var search_str = document.getElementById("search_input").value.trim();
      if( search_str.length >= 3 ){
        console.log('Buscando por: '+search_str);
        ApiService.searchEstablecimiento(search_str).then(function (response) {
          //console.log(response);
          console.log('Vuelve de buscar: ');
          console.log(response.data);
          $scope.establecimientos = response.data;
          document.getElementById("list_container").style.display = "block";
        });
      }
    }
    $scope.searchSelect = function(id){
      $state.go( "app.centro", {"id": id} );
    }

    $scope.showMap = function(){
      document.getElementById("map_wrapper").style.display="block";
      document.getElementById("map_container").style.display="block";
      document.getElementById("map_container").style.visibility="visible";
      document.getElementById("form_container").style.minHeight="210px";
      document.getElementById("search_view_list_button").style.display="block";
      document.getElementById("search_view_map_button").style.display="none";
    }

    $scope.showList = function(){
      document.getElementById("map_wrapper").style.display="none";
      document.getElementById("map_container").style.display="none";
      document.getElementById("map_container").style.visibility="hidden";
      document.getElementById("form_container").style.minHeight="460px";
      document.getElementById("search_view_map_button").style.display="block";
      document.getElementById("search_view_list_button").style.display="none";
    }


  }
]);
