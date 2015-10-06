'use strict';

function OfferService ($firebaseArray, $firebaseObject, $q, Auth, FURL) {

	var ref = new Firebase(FURL);
	var user = Auth.user;

	var Offer = {
		offers: function (taskId) {
			return $firebaseArray(ref.child('offers').child(taskId));
		},
		getOffer: function (taskId, offerId) {
			return $firebaseObject(ref.child('offers').child(taskId).child(offerId));
		},

		//Setter Methods
		aceptOffer: function (taskId, offerId, runnerId) {
			var o = ref.child('offers').child(taskId).child(offerId);
			return o.update({acepted: true}, function() {
				return ref.child('tasks').child(taskId).update({status: 'assigned', runner: runnerId});
			});
		},
		makeOffer: function (taskId, offer) {
			var taskOffers = this.offers(taskId);

			offer.datetime = Firebase.ServerValue.TIMESTAMP;
			offer.acepted = false;

			if (taskOffers) {
				return taskOffers.$add(offer);
			}
		},
		cancelOffer: function (taskId, offerId) {
			return this.getOffer(taskId, offerId).$remove();
		},

		//Status Methods
		isOffered: function(taskId) {
			if (user && user.provider) {
				var d = $q.defer();

				$firebaseArray(ref.child('offers').child(taskId).orderByChild	('uid')
						.equalTo(user.uid)).$loaded().then(function (data) {
							d.resolve(data.length > 0);
						}, function () {
							d.reject(false);
						});

				return d.promise;
			}
		},

		isMaker: function (offer) {
			return (user && user.provider && user.uid === offer.uid);
		}
	};


	return Offer;
}

angular.module('TaskNinjaApp')
		.factory('Offer', ['$firebaseArray', '$firebaseObject', '$q', 'Auth', 'FURL', OfferService]);
