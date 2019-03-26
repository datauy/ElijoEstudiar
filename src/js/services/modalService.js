pmb_im.services.factory('ModalService', [ function() {

  var modalOBJ = {};
  modalOBJ.activeModal = null;

  modalOBJ.checkNoModalIsOpen = function() {
    if(modalOBJ.activeModal){
      modalOBJ.activeModal.hide();
      modalOBJ.activeModal.remove();
    }
  }

  return modalOBJ;

}]);
