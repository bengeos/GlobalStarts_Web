function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/globalstart/addNews");
    $stateProvider
    /* News pages */
        .state('globalstart', {
            abstract: true,
            url: "/globalstart",
            templateUrl: "views/common/content.html",
        })
        .state('globalstart.addnews', {
            url: "/addNews",
            templateUrl: "views/News/addNews.html",
            controller: 'NewsCtrl',
            data: { pageTitle: 'Add New News' }
        })
        .state('globalstart.listNews', {
            url: "/list",
            templateUrl: "views/News/listNews.html",
            controller: 'NewsCtrl',
            data: { pageTitle: 'News List' }
        })
        .state('globalstart.listtestimony', {
            url: "/listtestimony",
            templateUrl: "views/News/listtestimonies.html",
            controller: 'NewsCtrl',
            data: { pageTitle: 'News List' }
        })



        .state('users.webusers', {
            url: "/webUsers",
            templateUrl: "views/Users/webUsers.html",
            controller: 'WebUsers',
            data: { pageTitle: 'Example view' }
        })
        .state('users.mobileusers', {
            url: "/mobileUsers",
            templateUrl: "views/Users/mobileUsers.html",
            controller: 'MobileUsers',
            data: { pageTitle: 'Example view' }
        })
        .state('login', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/logincontent.html"
        })
        .state('login.signin', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LogInCtrl',
            data: { pageTitle: 'Example view' }
        })
}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });