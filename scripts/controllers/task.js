'use strict';

function TaskCtrl ($scope, $location, toaster, Auth, Task) {

	$scope.createTask = function() {
		$scope.task.status = 'open';
		$scope.task.gravatar = Auth.user.profile.gravatar;
		$scope.task.name = Auth.user.profile.name;
		$scope.task.poster = Auth.user.uid;

		Task.createTask($scope.task)
				.then(function (ref){
					toaster.success($scope.task.title + ' created', 'Successfully created');
					$scope.task = {};
					$location.path('/browse/' + ref.key());
				});
	};

	$scope.editTask = function (task) {
		Task.editTask(task)
				.then(function () {
					toaster.info('Task Successfully Saved', task.title + ' saved');
				});
	};

}

angular.module('TaskNinjaApp')
	.controller('TaskController', ['$scope', '$location','toaster', 'Auth', 'Task', TaskCtrl]);
