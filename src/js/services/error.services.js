pmb_im.services.factory('ErrorService', ['$http','$ionicPopup', 'ValidationService', function($http,$ionicPopup,ValidationService) {

  return {
    http_response_is_successful: function (jsonResult, errorContainerId) {
      var errorDiv = document.getElementById(errorContainerId);
      if(jsonResult.data && jsonResult.data.Status=="success" || jsonResult.Status=="success"){
        errorDiv.style.display = "none";
        return true;
      }else{
        if(jsonResult.data){
          errorDiv.innerHTML="<h3>" + jsonResult.data.Message + "</h3>";
        }else{
          errorDiv.innerHTML="<h3>" + jsonResult.Message + "</h3>";
        }
        errorDiv.style.display = "block";
        return false;
      }
    },

    http_response_is_successful_ajax: function (jsonResult) {
      if(jsonResult.data.result==0){
        return false;
      }else{
        return true;
      }
    },

    http_response_is_successful_popup: function (jsonResult) {
      if(jsonResult.data.result==0){
        var alertPopup = $ionicPopup.alert({
         title: "Error",
         template: jsonResult.data.message
        });
        alertPopup.then(function(res) {
          return false;
        });
        return false;
      }else{
        return true;
      }
    },

    http_data_response_is_successful: function (data, errorContainerId) {
      var errorDiv = document.getElementById(errorContainerId);
      if(data.Status!='success'){
        errorDiv.innerHTML="<h3>" + data.Message + "</h3>";
        errorDiv.style.display = "block";
        return false;
      }else{
        errorDiv.style.display = "none";
        return true;
      }
    },

    http_data_response_is_successful_ajax: function (data) {
      if(data.result==0){
        return false;
      }else{
        return true;
      }
    },

    show_error_message: function (errorContainerId, message) {
        var errorDiv = document.getElementById(errorContainerId);
        errorDiv.innerHTML="<h3>" + message + "</h3>";
        errorDiv.style.display = "block";
        return false;
    },

    show_error_message_popup: function (message) {
        var alertPopup = $ionicPopup.alert({
         title: "Error",
         template: message
        });
        alertPopup.then(function(res) {
          return false;
        });
        return false;
    },

    check_fields: function (fields, errorContainerId) {
      var errors = "";
      fields.forEach(function(field) {
        if(field.type=="notNull"){
          if(!ValidationService.validate_not_empty(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" no puede estar vacío.</h3>';
          }
        }
        if(field.type=="email"){
          if(!ValidationService.validate_email(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" no es una dirección de correo válida.</h3>';
          }
        }
        if(field.type=="iddoc_uy"){
          if(!ValidationService.validate_iddoc_uy(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" no es una cédula uruguaya válida.</h3>';
          }
        }
        if(field.type=="two_words"){
          if(!ValidationService.validate_two_words(field.value)){
            errors = errors + '<h3>- El campo "' + field.name + '" debe contener al menos dos palabras.</h3>';
          }
        }
        if(field.type=="equalsTo"){
          if(!ValidationService.validate_equalsTo(field.value, field.secondValue)){
            errors = errors + '<h3>- Los campos "' + field.name + '" no coinciden.</h3>';
          }
        }
      });
      if(errors ==""){
        return true;
      }else{
        var errorDiv = document.getElementById(errorContainerId);
        errorDiv.innerHTML= errors;
        errorDiv.style.display = "block";
        return false;
      }
    }


  };
}]);
