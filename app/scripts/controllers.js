angular
    .module('inspinia')
    .controller('MainCtrl', function MainCtrl() {
        var config = {
            apiKey: "AIzaSyBUu2wuRjrWk_w228z7bGnSefWyjlXCCY0",
            authDomain: "globalstarts-812d4.firebaseapp.com",
            databaseURL: "https://globalstarts-812d4.firebaseio.com",
            storageBucket: "globalstarts-812d4.appspot.com",
            messagingSenderId: "854438979646"
        };
        firebase.initializeApp(config);
    })