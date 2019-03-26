pmb_im.services.factory('AuthService', ['$http', '$cordovaFileTransfer', 'ConfigService','ValidationService', function($http, $cordovaFileTransfer, ConfigService, ValidationService) {

  var baseURL = ConfigService.baseURL + "/api/";

  return {
    log_in: function (user,password) {
        var body = 'user='+user+'&password='+password;
        return $http.post(baseURL + 'login', body,{withCredentials: true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    },

    sign_out: function (password, email) {
      return $http.get(baseURL + "sign_out", { withCredentials: true, params: { password_sign_in: password, email: email } });
    },

    create_user: function (userObj) {
      if(userObj.picture_url && ValidationService.isMobileDevice()){
        var options = {
         fileKey: "photo",
         //fileName: filename,
         //chunkedMode: false,
         //mimeType: "image/jpg",
         withCredentials: true,
         params : {  user: userObj.username,
                     password: userObj.password,
                     email: userObj.email,
                     gender: userObj.gender,
                     interested: userObj.interested,
                     status: userObj.status,
                     show_location: userObj.show_location,
                   }
        };
        var trustAllHosts = true;
        return $cordovaFileTransfer.upload(baseURL + "create_user", userObj.picture_url, options, trustAllHosts);
      }else{
        if(userObj.picture_url){
          var formData = new FormData();
        	formData.append("photo", userObj.picture_url);
        	formData.append("user", userObj.username);
        	formData.append("password", userObj.password);
        	formData.append("email", userObj.email);
        	formData.append("gender", userObj.gender);
        	formData.append("interested", userObj.interested);
        	formData.append("status", userObj.status);
        	formData.append("show_location", userObj.show_location);
          return $http.post(baseURL + 'create_user', formData, {
              headers: { 'Content-Type': undefined },
              transformRequest: angular.identity
          });
        }else{
          var body = 'user='+userObj.username+'&password='+userObj.password+'&email='+userObj.email+'&gender='+userObj.gender;
          body = body +'&interested='+userObj.interested+'&status='+userObj.status+'&show_location='+userObj.show_location;
          return $http.post(baseURL + 'create_user', body,{withCredentials: true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        }
      }

    },

    password_recovery: function (email) {
      return $http.get(baseURL + "forgot_password", { params: { login_email: email}
                                        });
    },

    password_change: function (email,oldPassword,newPassword,confirmPassword) {

      var body = 'email='+email+'&password_sign_in='+oldPassword+'&new_password='+newPassword+'&confirm='+confirmPassword;
      return $http.post(baseURL + 'change_password', body,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

    },


    edit_user: function (userObj) {
      if(userObj.picture_url && ValidationService.isMobileDevice()){
        var options = {
         fileKey: "photo",
         //fileName: filename,
         //chunkedMode: false,
         //mimeType: "image/jpg",
         withCredentials: true,
         params : {  user: userObj.username,
                     password: userObj.password,
                     email: userObj.email,
                     gender: userObj.gender,
                     interested: userObj.interested,
                     status: userObj.status,
                     show_location: userObj.show_location,
                   }
        };
        var trustAllHosts = true;
        return $cordovaFileTransfer.upload(baseURL + "edit_profile", userObj.picture_url, options, trustAllHosts);
      }else{
        var body = 'user='+userObj.username+'&password='+userObj.password+'&email='+userObj.email+'&gender='+userObj.gender;
        body = body +'&interested='+userObj.interested+'&status='+userObj.status+'&show_location='+userObj.show_location;
        if(userObj.picture_url){
          var formData = new FormData();
        	formData.append("photo", userObj.picture_url);
        	formData.append("user", userObj.username);
        	formData.append("password", userObj.password);
        	formData.append("email", userObj.email);
        	formData.append("gender", userObj.gender);
        	formData.append("interested", userObj.interested);
        	formData.append("status", userObj.status);
        	formData.append("show_location", userObj.show_location);
          return $http.post(baseURL + 'edit_profile', formData, {
              headers: { 'Content-Type': undefined },
              transformRequest: angular.identity
          });
        }else{
          return $http.post(baseURL + 'edit_profile', body,{withCredentials: true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        }
      }
    }

  };
}]);
