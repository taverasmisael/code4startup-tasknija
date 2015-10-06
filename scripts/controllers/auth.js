
'use strict';

function AuthCtrl ($scope, $location, toaster, Auth) {

	if (Auth.signedIn()) {console.log('Voy a redirigirte :v');$location.path('/');}

	$scope.register = function (user) {
		Auth.register(user).then(function () {
			toaster.success('Successfully Register', 'Welcome! ' + user.name);
			$location.path('/');
		}, function (err) {
			toaster.error('Oopss :( Something went Wrong!', 'Error!');
			console.log(err);
		});
	};

	$scope.login = function (user) {
		Auth.login(user)
			.then(function() {
				toaster.success('You\'re in!', 'Enjoy');
				$location.path('/');
			}, function (err) {
				toaster.error('Oopss :( Something went Wrong!', 'Error!');
				console.log(err);
			});
	};

	$scope.changePassword = function (user) {
		Auth.changePassword(user)
			.then(function() {

				//Reset the Model
				$scope.user.email = '';
				$scope.user.oldpass = '';
				$scope.user.newpass = '';
				toaster.info('Password Changed Successfully!', 'You\'re safe!');
			}, function (err) {
				toaster.error('Oopss :( Something went Wrong!', 'Error!');
				console.log(err);
			});
	};

}

angular.module('TaskNinjaApp')
	.controller('AuthController', ['$scope', '$location', 'toaster', 'Auth', AuthCtrl]);
