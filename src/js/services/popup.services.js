pmb_im.services.factory('PopUpService', ['$ionicPopup','ValidationService', function($ionicPopup,ValidationService) {

  return {
    show_alert: function (alert_title,alert_message) {
        var alertPopup = $ionicPopup.alert({
         title: alert_title,
         template: alert_message
        });
        alertPopup.then(function(res) {
          return true;
        });
        return true;
    },

   confirmPopup: function(title,text){
     var confirmPopup = $ionicPopup.confirm({
                         title: title,
                         template: text
                       });
     return confirmPopup;
   },

   askForOneValuePopUp: function(scope,title,text,field_name,validationType){
      $scope = scope;
      var myPopup = $ionicPopup.show({
      template: field_name + ': <input type="text" id="one_value_popup"><div id="error_container_inside"></div>',
      title: title,
      subTitle: text,
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Enviar</b>',
          type: 'button-positive',
          onTap: function(e) {
            var errors = "";
            var value = document.getElementById("one_value_popup").value;
            if(validationType=="notNull"){
              if(!ValidationService.validate_not_empty(value)){
                errors = errors + '<h3>- El campo "' + field_name + '" no puede estar vacío.</h3>';
              }
            }
            if(validationType=="email"){
              if(!ValidationService.validate_email(value)){
                errors = errors + '<h3>- El campo "' + field_name + '" no es una dirección de correo válida.</h3>';
              }
            }
            if(validationType=="iddoc_uy"){
              if(!ValidationService.validate_iddoc_uy(value)){
                errors = errors + '<h3>- El campo "' + field_name + '" no es una cédula uruguaya válida.</h3>';
              }
            }
            if(validationType=="two_words"){
              if(!ValidationService.validate_two_words(value)){
                errors = errors + '<h3>- El campo "' + field_name + '" debe contener al menos dos palabras.</h3>';
              }
            }
            if(errors!=""){
              var errorDiv = document.getElementById("error_container_inside");
              errorDiv.innerHTML= errors;
              errorDiv.style.display = "block";
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return value;
            }
          }
        }
      ]
    });
    return myPopup;
   }


  };
}]);
