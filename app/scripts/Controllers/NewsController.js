/**
 * Created by bengeos on 1/19/17.
 */
angular
    .module('inspinia')
    .controller('NewsCtrl', function($scope,$timeout,$filter,$state) {
        console.log("controller loaded");
        var user = firebase.auth().currentUser;
        if (!user) {
            console.log("Invalid user");
            $state.go("login.signin");
        }
        $scope.userSignOut = function (Users) {
            firebase.auth().signOut().then(function () {
                console.log("Sign out");
            }, function (error) {
                console.log("Sign out error");
            });
        }
        var database = firebase.database();
        var databaseRef = database.ref();
        var NewsRef = databaseRef.child("News");
        var TestimoniesRef = databaseRef.child("Testimonies");
        var storage = firebase.storage();

        $scope.isAdding = true;
        $scope.image_url = "";
        $scope.GlobalNews = new Array();
        $scope.GlobalTestimonies = new Array();

        NewsRef.on('value', function (snapshot) {
            $scope.GlobalNews = new Array();
            $timeout(function () {
                snapshot.forEach(function(childSnapshot) {
                    var parentKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    childData.ParentID = parentKey;
                    $scope.GlobalNews.push(childData);
                });
                console.log("All Newses :",$scope.GlobalNews);
            });
        });

        TestimoniesRef.on('value', function (snapshot) {
            $scope.GlobalTestimonies = new Array();
            $timeout(function () {
                snapshot.forEach(function(childSnapshot) {
                    var parentKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    childData.ParentID = parentKey;
                    $scope.GlobalTestimonies.push(childData);
                });
                console.log("All Testimonies :",$scope.GlobalTestimonies);
            });
        });

        var uploader = document.getElementById("upload_button");
        var progress_bar = document.getElementById("progress_bar");
        $scope.image_url = "";
        uploader.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var storageRef = storage.ref('images/'+(new Date()));
            var task = storageRef.put(file);

            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes);
                    console.log(percentage);
                    progress_bar.value = percentage;
                },
                function error() {

                },
                function complete(snapshot) {
                    console.log("Upload Completed: ",task.snapshot.downloadURL);
                    $scope.image_url = task.snapshot.downloadURL;
                }
            )

        });


        $scope.addNewNews = function (newNews) {
            console.log("Add New News: ",newNews);
            if($scope.image_url){
                var foundNews = {
                    Title:newNews.Title,
                    Summary:newNews.Summary,
                    Detail:newNews.Detail,
                    ImageURL:$scope.image_url,
                    PubDate:$filter('date')(new Date(), 'dd/MM/yyyy')
                };
                console.log("Adding New News: ",foundNews);
                NewsRef.push(foundNews);
                progress_bar.value = 0;
                $scope.News = {};
            }
        }
        $scope.addEditedNews = function (newNews) {
            console.log("addEditedNews New News: ",newNews);
            if(newNews.ImageURL){
                var foundNews = {
                    Title:newNews.Title,
                    Summary:newNews.Summary,
                    Detail:newNews.Detail,
                    ImageURL:newNews.ImageURL,
                    PubDate:$filter('date')(new Date(), 'dd/MM/yyyy')
                };
                console.log("Adding New News: ",foundNews);
                NewsRef.child(newNews.ParentID).set(foundNews);
                $scope.News = {};
            }
        }
        $scope.removeNews = function (news) {
            NewsRef.child(news.ParentID).remove();
            $scope.News = {};
            console.log("Remove Album",news);
        }
        $scope.editNews = function (editNews) {
            console.log("Edit New News: ",editNews);
            $scope.isAdding = false;
            $scope.isediting = true;
            $scope.isDeleting = false;
            console.log("editting Album",editNews);
            $scope.News = editNews;
        }
        $scope.delteNews = function (editNews) {
            console.log("Delete Album: ",editNews);
            $scope.isAdding = false;
            $scope.isediting = false;
            $scope.isDeleting = true;
            $scope.News = editNews;
        }
        $scope.cancelTask = function () {
            console.log("Cancel Task: ");
            $scope.isEditting = false;
            $scope.isAdding = true;
            $scope.isDeleting = false;
            $scope.News = {};
        }
    });