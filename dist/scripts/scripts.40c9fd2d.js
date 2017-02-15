function config($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/globalstart/addNews"),$stateProvider.state("globalstart",{abstract:!0,url:"/globalstart",templateUrl:"views/common/content.html"}).state("globalstart.addnews",{url:"/addNews",templateUrl:"views/News/addNews.html",controller:"NewsCtrl",data:{pageTitle:"Add New News"}}).state("globalstart.listNews",{url:"/list",templateUrl:"views/News/listNews.html",controller:"NewsCtrl",data:{pageTitle:"News List"}}).state("globalstart.listtestimony",{url:"/listtestimony",templateUrl:"views/News/listtestimonies.html",controller:"NewsCtrl",data:{pageTitle:"News List"}}).state("users.webusers",{url:"/webUsers",templateUrl:"views/Users/webUsers.html",controller:"WebUsers",data:{pageTitle:"Example view"}}).state("users.mobileusers",{url:"/mobileUsers",templateUrl:"views/Users/mobileUsers.html",controller:"MobileUsers",data:{pageTitle:"Example view"}}).state("login",{abstract:!0,url:"/index",templateUrl:"views/common/logincontent.html"}).state("login.signin",{url:"/login",templateUrl:"views/login.html",controller:"LogInCtrl",data:{pageTitle:"Example view"}})}function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="Global Start | Responsive Admin Theme";toState.data&&toState.data.pageTitle&&(title="Global Start | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){$timeout(function(){element.metisMenu()})}}}function iboxTools($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/ibox_tools.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.find("div.ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()}}}}function minimalizaSidebar($timeout){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',controller:function($scope,$element){$scope.minimalize=function(){$("body").toggleClass("mini-navbar"),!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}}}}function iboxToolsFullScreen($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/ibox_tools_full_screen.html",controller:function($scope,$element){$scope.showhide=function(){var ibox=$element.closest("div.ibox"),icon=$element.find("i:first"),content=ibox.find("div.ibox-content");content.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),ibox.toggleClass("").toggleClass("border-bottom"),$timeout(function(){ibox.resize(),ibox.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var ibox=$element.closest("div.ibox");ibox.remove()},$scope.fullscreen=function(){var ibox=$element.closest("div.ibox"),button=$element.find("i.fa-expand");$("body").toggleClass("fullscreen-ibox-mode"),button.toggleClass("fa-expand").toggleClass("fa-compress"),ibox.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}}}$(document).ready(function(){function fix_height(){var heightWithoutNavbar=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",heightWithoutNavbar+"px");var navbarHeigh=$("nav.navbar-default").height(),wrapperHeigh=$("#page-wrapper").height();navbarHeigh>wrapperHeigh&&$("#page-wrapper").css("min-height",navbarHeigh+"px"),navbarHeigh<wrapperHeigh&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(navbarHeigh>wrapperHeigh?$("#page-wrapper").css("min-height",navbarHeigh+"px"):$("#page-wrapper").css("min-height",$(window).height()-60+"px"))}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fix_height()}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),setTimeout(function(){fix_height()})}),$(function(){$(window).bind("load resize",function(){$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")})}),function(){angular.module("inspinia",["ui.router","ui.bootstrap"])}(),angular.module("inspinia").config(config).run(function($rootScope,$state){$rootScope.$state=$state}),angular.module("inspinia").directive("pageTitle",pageTitle).directive("sideNavigation",sideNavigation).directive("iboxTools",iboxTools).directive("minimalizaSidebar",minimalizaSidebar).directive("iboxToolsFullScreen",iboxToolsFullScreen),angular.module("inspinia").controller("MainCtrl",function(){var config={apiKey:"AIzaSyBUu2wuRjrWk_w228z7bGnSefWyjlXCCY0",authDomain:"globalstarts-812d4.firebaseapp.com",databaseURL:"https://globalstarts-812d4.firebaseio.com",storageBucket:"globalstarts-812d4.appspot.com",messagingSenderId:"854438979646"};firebase.initializeApp(config)}),angular.module("inspinia").controller("LogInCtrl",function($scope,$location,$state){console.log("Log in controller loaded"),firebase.auth().onAuthStateChanged(function(user){user?(console.log("Sign in",user),$state.go("globalstart.addnews")):console.log("Not Sign in")}),$scope.userSignIn=function(Users){console.log(Users);firebase.auth().signInWithEmailAndPassword(Users.Username,Users.Userpass)},$scope.userSignOut=function(Users){firebase.auth().signOut().then(function(){console.log("Sign out")},function(error){console.log("Sign out error")})}}),angular.module("inspinia").controller("NewsCtrl",function($scope,$timeout,$filter,$state){console.log("controller loaded");var user=firebase.auth().currentUser;user||(console.log("Invalid user"),$state.go("login.signin")),$scope.userSignOut=function(Users){firebase.auth().signOut().then(function(){console.log("Sign out")},function(error){console.log("Sign out error")})};var database=firebase.database(),databaseRef=database.ref(),NewsRef=databaseRef.child("News"),TestimoniesRef=databaseRef.child("Testimonies"),storage=firebase.storage();$scope.isAdding=!0,$scope.image_url="",$scope.GlobalNews=new Array,$scope.GlobalTestimonies=new Array,NewsRef.on("value",function(snapshot){$scope.GlobalNews=new Array,$timeout(function(){snapshot.forEach(function(childSnapshot){var parentKey=childSnapshot.key,childData=childSnapshot.val();childData.ParentID=parentKey,$scope.GlobalNews.push(childData)}),console.log("All Newses :",$scope.GlobalNews)})}),TestimoniesRef.on("value",function(snapshot){$scope.GlobalTestimonies=new Array,$timeout(function(){snapshot.forEach(function(childSnapshot){var parentKey=childSnapshot.key,childData=childSnapshot.val();childData.ParentID=parentKey,$scope.GlobalTestimonies.push(childData)}),console.log("All Testimonies :",$scope.GlobalTestimonies)})});var uploader=document.getElementById("upload_button"),progress_bar=document.getElementById("progress_bar");$scope.image_url="",uploader.addEventListener("change",function(e){var file=e.target.files[0],storageRef=storage.ref("images/"+new Date),task=storageRef.put(file);task.on("state_changed",function(snapshot){var percentage=snapshot.bytesTransferred/snapshot.totalBytes;console.log(percentage),progress_bar.value=percentage},function(){},function(snapshot){console.log("Upload Completed: ",task.snapshot.downloadURL),$scope.image_url=task.snapshot.downloadURL})}),$scope.addNewNews=function(newNews){if(console.log("Add New News: ",newNews),$scope.image_url){var foundNews={Title:newNews.Title,Summary:newNews.Summary,Detail:newNews.Detail,ImageURL:$scope.image_url,PubDate:$filter("date")(new Date,"dd/MM/yyyy")};console.log("Adding New News: ",foundNews),NewsRef.push(foundNews),progress_bar.value=0,$scope.News={}}},$scope.addEditedNews=function(newNews){if(console.log("addEditedNews New News: ",newNews),newNews.ImageURL){var foundNews={Title:newNews.Title,Summary:newNews.Summary,Detail:newNews.Detail,ImageURL:newNews.ImageURL,PubDate:$filter("date")(new Date,"dd/MM/yyyy")};console.log("Adding New News: ",foundNews),NewsRef.child(newNews.ParentID).set(foundNews),$scope.News={}}},$scope.removeNews=function(news){NewsRef.child(news.ParentID).remove(),$scope.News={},console.log("Remove Album",news)},$scope.editNews=function(editNews){console.log("Edit New News: ",editNews),$scope.isAdding=!1,$scope.isediting=!0,$scope.isDeleting=!1,console.log("editting Album",editNews),$scope.News=editNews},$scope.delteNews=function(editNews){console.log("Delete Album: ",editNews),$scope.isAdding=!1,$scope.isediting=!1,$scope.isDeleting=!0,$scope.News=editNews},$scope.cancelTask=function(){console.log("Cancel Task: "),$scope.isEditting=!1,$scope.isAdding=!0,$scope.isDeleting=!1,$scope.News={}}});