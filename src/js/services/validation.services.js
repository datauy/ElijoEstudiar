pmb_im.services.factory('ValidationService', ['$http','$ionicPopup', function($http,$ionicPopup) {

  return {
    isMobileDevice: function(){
      if(window.cordova){
        return true;
      } else {
        return false;
      }

    },

    validate_not_empty: function (value) {
        if(value!=null && value!="undefined" && value!=""){
          return true;
        }else{
          return false;
        }
    },

    validate_two_words: function (value) {
        if(value!=null && value!="undefined" && value!=""){
          var values = value.split(' ').filter(function(v){return v!==''});
          if (values.length > 1) {
              //two or more words
              return true;
          } else {
              //not enough words
              return false;
          }
        }else{
          return false;
        }
    },

    validate_equalsTo: function (value,secondValue) {
      if(value==secondValue){
        return true;
      }else{
        return false;
      }
    },

    validate_email: function (value) {
        if(value!=null && value!="undefined" && value!=""){
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(value);
        }else{
          return false;
        }
    },

    validate_iddoc_uy: function (value) {
      if(value!=null && value!="undefined" && value!=""){
          value = value.replace(/\D/g, '');
          var dig = value[value.length - 1];
          var a = 0; var i = 0;
          if(value.length <= 6){
            for(i = value.length; i < 7; i++){
              value = '0' + value;
            }
          }
          for(i = 0; i < 7; i++){
            a += (parseInt("2987634"[i]) * parseInt(value[i])) % 10;
          }
          var result;
          if(a%10 === 0){
            result = 0;
          }else{
            result = 10 - a % 10;
          }
          if(dig == result){
            return true;
          }else{
            return false;
          }
      }else{
        return false;
      }
    }
  };
}]);
