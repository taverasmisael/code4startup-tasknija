function BrowseCtrl ($scope, $routeParams, toaster, Auth, Task, Comment, Offer) {

// Inicializacino y rutas

	$scope.listMode = true
	$scope.searchTask = '';
	$scope.tasks = Task.all;
	$scope.signedIn = Auth.signedIn;
	$scope.user = Auth.user;

	if ($routeParams.taskId) {
		var task = Task.getTask($routeParams.taskId);
		setSelectedTask(task);
		$scope.listMode = false;
	}


// Scope Browsing and Commenting Functions

	$scope.cancelTask = function (taskId) {
		Task.cancelTask(taskId).then(function(){
			toaster.error($scope.selectedTask.title + ' cancelled', 'Task Successfully closed');
		});
	};
	$scope.completeTask = function (taskId) {
		if(!Task.completeTask(taskId)) {
			toaster.success('You\'ve acomplished this task', 'Congratullations');
		} else {
			toaster.error('An error was occurreed :(', 'Task Don\'t Acomplished');
		}
	};

	$scope.addComment = function (comment) {
		comment.name =  $scope.user.profile.name,
		comment.gravatar = $scope.user.profile.gravatar

		Comment.addComment($scope.selectedTask.$id, comment).then(function(){
			$scope.comment.content = '';
		});
	};

//Scope Offer Functions

	$scope.makeOffer = function () {
		var offer = {
			total: $scope.total,
			uid: $scope.user.uid,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Offer.makeOffer($scope.selectedTask.$id, offer).then(function() {
			$scope.total = '';
			$scope.block = true;
			$scope.alreadyOffered = true;
		});
	};

	$scope.cancelOffer = function (offerId) {
		Offer.cancelOffer($scope.selectedTask.$id, offerId).then(function(){
			toaster.info('Your offer has been cancelled', 'Cancelled Offer');
			$scope.alreadyOffered = false;
		});
	};

	$scope.acceptOffer = function (offerId, runnerId) {
		if (!Offer.aceptOffer($scope.selectedTask.$id, offerId, runnerId)) {
			toaster.success('Your task has been assigned', 'Congratullations');
		} else {
			toaster.error('An error was occurreed :(', 'Offer Don\'t accepted');
		}
	};


// Private Functions
	function setSelectedTask (task) {
		$scope.selectedTask = task;
		$scope.listMode = false;
		$scope.comments = Comment.comments(task.$id);
		$scope.offers = Offer.offers(task.$id);
		$scope.block = false;

		if (Auth.signedIn()) {

			//Check if Current login user has already made an offer for selected task
			Offer.isOffered(task.$id).then(function (data) {$scope.alreadyOffered = data});

			$scope.isTaskCreator = Task.isCreator;
			$scope.isOpen = Task.isOpen;
			$scope.isOfferMaker = Offer.isMaker;
			$scope.isAssignee = Task.isAssignee;
			$scope.isCompleted = Task.isCompleted;
		}
	}
}

angular.module('TaskNinjaApp')
	.controller('BrowseController', ['$scope', '$routeParams', 'toaster', 'Auth', 'Task', 'Comment', 'Offer', BrowseCtrl]);
