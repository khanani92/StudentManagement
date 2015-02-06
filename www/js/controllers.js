angular.module('starter.controllers', [])

//.controller('DashCtrl', function($scope) {
//})
//
.controller('UserCtrl', function($scope, User) {
        $scope.user =User.getUser();
        $scope.changeData = {};
        //if((user.uid) || (JSON.parse(localStorage.getItem('userInfo')))){
        //    $scope.user = user
        //}else{
        //
        //}

        $scope.changeEmail = function(){

            if(($scope.changeData.email) && (validateEmail($scope.changeData.email))){
              User.changeEmail( $scope.user.password.email,$scope.changeData.email,function(res){
                  $ionicPopup.alert({
                      title: 'Changing Status',
                      template: res
                  });
              })
            }else{
                alert('No')
            }
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        $scope.logout= function(){
            $scope.user = User.logout()

        }


})
//
//.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//  $scope.friend = Friends.get($stateParams.friendId);
//})

    .controller('AccountCtrl', ["$scope", "$ionicPopup", "User", function($scope, $ionicPopup, User) {
   $scope.user = User.getUser();

        //if($scope.user){
        //    console.log($scope.user)
        //}else{
        //    $scope.user =  JSON.parse(localStorage.getItem('userInfo'));
        //}
   $scope.login = function () {
     User.login($scope.user.email, $scope.user.password, function(res) {
       if (res.uid) {
         $scope.user = res;
           localStorage.setItem('userInfo',JSON.stringify(res))
           //console.log(res)
         } else {
         $ionicPopup.alert({
           title: 'Login error!',
             template: res.message
         });
       }
     });
   };

 $scope.register = function () {
   User.register($scope.user.email, $scope.user.password, function(res) {
     if (res.uid) {
       $scope.user = res;
       } else {
       $ionicPopup.alert({
         title: 'Register error!',
           template: res.message
       });
     }
   });
 };

 $scope.logout = function () {
   User.logout();
   $scope.user = {};
   };
 }]);
