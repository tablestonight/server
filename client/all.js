angular
	.module('connectVegas', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('confirm', {
				url: '/confirm/:uuid',
				controller: 'main',
				templateUrl: './main.html'
			});

		// $urlRouterProvider.otherwise('/confirm');
	})
	.controller('main', function($scope, $http, $stateParams) {
		$http.post('/host/verify', {uuid: $stateParams.uuid})
			.then(success, failure);

		function success(response) {
			$scope.verified = true;
		}

		function failure(response) {
			$scope.verified = false;
		}
	});
