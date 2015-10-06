'use strict';

angular
	.module('TaskNinjaApp', [
		'ngAnimate',
		'ngResource',
		'ngRoute',
		'firebase',
		'toaster',
		'angularMoment'
	])
	.constant('FURL', 'https://c4startuptn.firebaseio.com/')
	.constant('angularMomentConfig', {timezone: 'America/Santo_Domingo'})
	.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/browse.html',
			controller: 'BrowseController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'AuthController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'AuthController'
		})
		.when('/browse/:taskId', {
			templateUrl: 'views/browse.html',
			controller: 'BrowseController',
		})
		.otherwise({redirectTo: '/'});
	}]);
