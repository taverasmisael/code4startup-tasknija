'use strict';

function NavCtrl ($scope, $location, toaster, Auth) {

	$scope.signedIn = Auth.signedIn;
	$scope.currentUser = Auth.user;

	$scope.logout = function() {
		$location.path('/#/browse');
		Auth.logout();
		toaster.info('Come back soon', 'You are logged out');
	};


}





angular.module('TaskNinjaApp')
	.controller('NavController',['$scope', '$location','toaster', 'Auth', NavCtrl]);
