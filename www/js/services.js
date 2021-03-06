angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('User', ["$timeout","$firebase", function($timeout,$firebase ) {
      var ref = new Firebase('https://studentmanageionic.firebaseio.com/');
      var auth = $firebase(ref);
      var user = {};

      return {
        login: function(email, password, callback) {
          ref.authWithPassword({
            email: email,
            password: password,
            rememberMe: false
          },function(err,res) {
            user = res;
            if (callback) {
              $timeout(function() {
                callback(res);
              });
            }
          }, function(err) {
            callback(err);
          });
        },
        register: function(email, password, callback) {
          ref.createUser({email:email, password:password},function(res) {
            user = res;
            if (callback) {
              callback(res);
            }
          })
          //    function(err) {
          //  callback(err);
          //});
        },
        getUser: function() {
        return user;
        },
        logout: function() {
          ref.unauth();
          user = {};
            return user;
        },
         changeEmail: function(oldEmail,newEmail,callback){
             /*ref.changePassword({
                 email       : "user@user.com",
                 oldPassword : "abc",
                 newPassword : "abcd"
             }, function(error) {
                 if (error === null) {
                     console.log("Email changed successfully");
                 } else {
                     console.log("Error changing email:", error);
                 }
             }); */


             ref.changeEmail({
                 oldEmail : oldEmail,
                 newEmail : newEmail
             }, function(error) {
                 if (error === null) {
                     callback('Your email is changed')
                 } else {
                     callback(error)
                 }
             });
         }


      }

    }]);