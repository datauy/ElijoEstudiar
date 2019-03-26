pmb_im.services.factory('SemaphoreService', [function() {

  var semaphoreObj = {};
  semaphoreObj.semaphores = new Array();
  semaphoreObj.semaphores['open-modal'] = "available";
  semaphoreObj.semaphores['submit-form'] = "available";
  semaphoreObj.semaphores['submit-location'] = "available";
  semaphoreObj.semaphores['can_talk'] = "available";




  semaphoreObj.takeIfAvailable = function(semaphoreId) {
    //console.log(semaphoreId + ":" + semaphoreObj.semaphores[semaphoreId]);
    if(semaphoreObj.semaphores[semaphoreId]=="available"){
        semaphoreObj.semaphores[semaphoreId] = "occupied";
        return true;
    }else{
      return false;
    }
  }

  semaphoreObj.makeAvailableAgain = function(semaphoreId) {
    if(semaphoreObj.semaphores[semaphoreId]=="occupied"){
        semaphoreObj.semaphores[semaphoreId] = "available";
        return true;
    }else{
      return false;
    }
  }

  return semaphoreObj;

}]);
