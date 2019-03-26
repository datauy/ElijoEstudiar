pmb_im.services.factory('Loader', ['$ionicLoading', '$timeout','$ionicPopup',function($ionicLoading,$timeout,$ionicPopup) {

  var LOADERAPI = {

    showLoading: function(text) {
      text = text || 'Loading...';
      $ionicLoading.show({
        template: text
      });
    },

    hideLoading: function() {
      $ionicLoading.hide();
    },

    toggleLoadingWithMessage: function(text, timeout) {
      var self = this;

      self.showLoading(text);

      $timeout(function() {
        self.hideLoading();
      }, timeout || 3000);
    },

    confirmPopup:function(title,text){
      var confirmPopup = $ionicPopup.confirm({
     title: title,
     template: text
   });
   return confirmPopup;
 },


    showAlert:function(_title,_template) {
      var alertPopup = $ionicPopup.alert({
        title: _title,
        template: _template
      });
      return alertPopup;
 }

  };
  return LOADERAPI;
}]);
