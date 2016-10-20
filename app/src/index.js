'use strict';

var BASE_URL = 'http://localhost:8080/api';

angular.module('tccmeetings', ['ngMaterial', 'ngMdIcons', 'ngMaterialDatePicker', 'checklist-model', 'ngNotify', 'ngRoute', 'ngCookies', 'ngStorage', 'luegg.directives', 'material.svgAssetsCache', 'ngMessages'])
    .constant('SERVICE_PATH', {
        'ROOT_PATH': BASE_URL,
        'PUBLIC_PATH': BASE_URL + '/public',
        'PRIVATE_PATH': BASE_URL + '/private'
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'src/home/home.html',
            controller: 'HomeCtrl'
        })
            .when('/login', {
                templateUrl: 'src/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .when('/packagee', {
                templateUrl: 'src/packagee/packagee.html',
                controller: 'PackageeCtrl'
            })
            .when('/user', {
                templateUrl: 'src/user/user.html',
                controller: 'UserCtrl'
            })
            .when('/register', {
                templateUrl: 'src/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            })
            .when('/register/info', {
                templateUrl: 'src/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            })
            .when('/chat', {
                templateUrl: 'src/chat/chat.html',
                controller: 'ChatCtrl',
                controllerAs: 'vm'
            })
            .when('/meetings', {
                templateUrl: 'src/meetings/meetings.maintenance.html',
                controller: 'MeetingsCtrl',
                controllerAs: 'vm'
            })
            .when('/meetings/new', {
                templateUrl: 'src/meetings/meetings.new.html',
                controller: 'MeetingsCtrl',
                controllerAs: 'vm'
            })
            .when('/meetings/edit', {
                templateUrl: 'src/meetings/meetings.new.html',
                controller: 'MeetingsCtrl',
                controllerAs: 'vm'
            })
            .when('/disciplina', {
                templateUrl: 'src/disciplina/disciplina.maintenance.html',
                controller: 'DisciplinaCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/login'
            });
    })
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .run(function ($rootScope, ngNotify, LoginLogoutSrv) {
        $rootScope.authDetails = {name: '', authenticated: false, permissions: []};

        ngNotify.config({
            theme: 'pastel'
        });

        LoginLogoutSrv.verifyAuth();
    });
