/**
 * Created by bengeos on 11/30/16.
 */
angular
    .module('inspinia')
    .controller('LogInCtrl', function($scope, $location, $state) {
        console.log("Log in controller loaded");
        firebase.auth().onAuthStateChanged(function (user) {
            if(user){
                console.log("Sign in",user);
                $state.go("globalstart.addnews");
            }else {
                console.log("Not Sign in");
            }
        });
        $scope.userSignIn = function (Users) {
            console.log(Users);
            const promise = firebase.auth().signInWithEmailAndPassword(Users.Username,Users.Userpass);
        }
        $scope.userSignOut = function (Users) {
            firebase.auth().signOut().then(function () {
                console.log("Sign out");
            }, function (error) {
                console.log("Sign out error");
            });
        }
    });

