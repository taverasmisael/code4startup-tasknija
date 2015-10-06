'use strict';

function CommentService ($firebaseArray, $firebaseObject, FURL) {
	var ref = new Firebase(FURL);

	var Comment = {
		comments: function (taskId) {
			return $firebaseArray(ref.child('comments').child(taskId));
		},
		addComment: function (taskId, comment) {
			var taskComments = this.comments(taskId);
			comment.datetime = Firebase.ServerValue.TIMESTAMP;

			if (taskComments) {
				return taskComments.$add(comment);
			}
		}
	};

	return Comment;
}




angular.module('TaskNinjaApp')
		.factory('Comment', ['$firebaseArray', '$firebaseObject', 'FURL', CommentService]);
