pmb_im.services.factory('DBService', ['$q', function($q) {
   var _db;

   return {
       initDB: initDB,
       saveUser: saveUser,
       getUser: getUser,
       eraseUser: eraseUser,
       saveReport: saveReport,
       getReport: getReport,
       getAllReports: getAllReports,
       updateReport: updateReport,
       deleteReport: deleteReport,
       deleteGivenReport: deleteGivenReport,
       getCategories: getCategories,
       saveCategories: saveCategories
   };

   function saveUser(user_name, user_password, user_picture_url,show_location, uid, status, gender, interested) {
         var user = {
            _id: 'user-logged',
            name: user_name,
            password: user_password,
            picture_url: user_picture_url,
            show_location: show_location,
            uid: uid,
            status: status,
            gender: gender,
            interested: interested
         };
         getUser().then(function (doc) {
           user._rev = doc._rev;
           return _db.put(user);
         }).catch(function (err) {
           return _db.put(user);
         })
   };

  function getUser() {
     return _db.get('user-logged');
  };

  function eraseUser() {
    _db.get('user-logged').then(function(doc) {
      return _db.remove(doc);
    });
  }

   function initDB() {
       // Creates the database or opens if it already exists
       _db = new PouchDB('tomamosuna_local_db');
       return _db;
   };

   function saveReport(report) {
      //new_report_id = "report_" + pouchCollate.toIndexableString([report]);
      var date = new Date();
      var new_report_id = "report_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getMilliseconds();
      report._id = new_report_id;
      return _db.put(report);
   };

   function updateReport(report) {
     return _db.put(report);
  };

   function getCategories() {
     return _db.get('categories-list');
   };

   function saveCategories(categories) {
     getCategories().then(function (doc) {
       categories._rev = doc._rev;
       return _db.put(categories);
     }).catch(function (err) {
       categories._id = "categories-list";
       return _db.put(categories);
     })
   };

  function getReport(reportId) {
     return _db.get(reportId);
  };

   function getAllReports() {
     return _db.allDocs({
      include_docs: true,
      attachments: false,
      startkey: 'report_',
      endkey: 'report_\uffff'
     });/*.then(function (result) {
      // handle result
    }).catch(function (err) {
      console.log(err);
    });*/
  };

  function deleteReport(report_id) {
    _db.get(report_id).then(function(doc) {
      return _db.remove(doc);
    });
  };

  function deleteGivenReport(report) {
    return _db.remove(report);
  };

}]);
