'use strict';

function TaskService ($firebaseArray, $firebaseObject, Auth, FURL) {

	var ref = new Firebase(FURL);
	var tasks = $firebaseArray(ref.child('tasks'));
	var user = Auth.user;
	var reservacion  = [{n:1}, {n:3}, {n:49},{n:50}];

	var Task = {
		all: tasks,

		getTask: function (taskId) {
			return $firebaseObject(ref.child('tasks').child(taskId));
		},

		//Setter Methods

		createTask: function (task) {
			task.datetime = Firebase.ServerValue.TIMESTAMP;
			return tasks.$add(task);
		},
		editTask: function (task) {
			var t = ref.child('tasks').child(task.$id);
			t.update({title: task.title, description: task.description, total: task.total});
			return $firebaseObject(t).$loaded();
		},
		completeTask: function (taskId) {
			var t = ref.child('tasks').child(taskId);
			return t.update({status: 'completed', doneTime: Firebase.ServerValue.TIMESTAMP});
		},
		cancelTask: function (taskId) {
			var t = this.getTask(taskId);
			var t = ref.child('tasks').child(taskId);
			t.update({status:'cancelled'});
			return $firebaseObject(t).$loaded();
		},

		//Status Methods
		isAssignee: function (task) {
			return (user && user.provider && user.uid === task.runner);
		},
		isCreator: function (task) {
			return (user && user.provider && user.uid === task.poster);
		},
		isCompleted: function (task) {
			return task.status === 'completed';
		},
		isOpen: function (task){
			return task.status === 'open';
		}
	};


	return Task;
}





angular.module('TaskNinjaApp')
	.factory('Task', ['$firebaseArray', '$firebaseObject', 'Auth', 'FURL', TaskService]);
