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

    $scope.form = {};
    $scope.form.lugar = "";
    $scope.form.nombre_centro = "";
    $scope.form.option = "list";
    $scope.establecimientos = null;

    $scope.$on("$ionicView.beforeEnter", function() {
      document.getElementById("form_container").style.minHeight = "460px";
    });

    $scope.onSearchChange = function(){
      /*var search = document.getElementById("que_estudiar");
      var search_str = search.value.trim();
      if(search_str.length>=3){
        ApiService.searchQueEstudiar(search_str).then(function (response) {
          //console.log(response);
          $scope.form.SearchQueResults = response.data;
          document.getElementById("SearchQueResults").style.display = "block";
        });
      }else{
        $scope.hideSearchQueResults();
      }*/
    }

    $scope.hideSearchQueResults = function(){
      document.getElementById("SearchQueResults").style.display = "none";
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
