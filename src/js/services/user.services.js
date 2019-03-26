pmb_im.services.factory('UserService', ['$http', function($http) {

  //var baseURL = "http://pmbuy.development.datauy.org/auth/ajax/";
  var UserObj = {};
  UserObj.uid = null;
  UserObj.name = null;
  UserObj.email = null;
  UserObj.password = null;
  UserObj.picture_url = "url(./img/icon-user-anonymous.png)";
  UserObj.show_location = null;


  UserObj.save_user_data = function (user_name, user_password, user_picture_url, show_location, uid, status, gender, interested) {
      UserObj.uid = uid;
      UserObj.name = user_name;
      UserObj.password = user_password;
      UserObj.picture_url = user_picture_url;
      UserObj.show_location = show_location;
      UserObj.status = status;
      UserObj.gender = gender;
      UserObj.interested = interested;

      //SAVE IN POUCHDB
  }

  UserObj.erase_user_data = function () {
    UserObj.name = null;
    UserObj.email = null;
    UserObj.password = null;
    UserObj.identity_document = null;
    UserObj.phone = null;
    UserObj.picture_url = null;
    //DELETE IN POUCHDB
  }

  UserObj.get_user_data = function () {
    //LEVANTA DE POUCHDB LOS DATOS DEL USUARIO. SI HAY LOS PONE EN LAS VARIABLES DEL SERVICIO. SI NO HAY PONE TODO NULL
  }

  UserObj.add_photo = function (user_picture_url) {
    UserObj.picture_url = user_picture_url;
  }

  UserObj.isLogged = function () {
    if(UserObj.name!=null && UserObj.name!=""){
      return true;
    }else{
      return false;
    }
  }


  return UserObj;

}]);
