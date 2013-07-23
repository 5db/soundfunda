// Modules
var soundFunda = angular.module('soundFunda', []);

// Route Provider
soundFunda.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html'
		})
		.when('/play', {
			controller: 'SoundFundaController',
			templateUrl: 'views/sound.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// Controllers
soundFunda.controller('SoundFundaController', function($scope, $rootScope) {
	$scope.tracks = [];

	$scope.search = function(sound) {
		SC.initialize({
			client_id: 'CLIENT_ID_HERE',
			redirect_uri: "http://localhost:9000/soundfunda/#/play"
		});

		SC.connect(function() {
			SC.get("/tracks", {q: $scope.sound.name, limit: 20}, function(tracks) {
				$rootScope.$apply(function() {
					$scope.tracks = tracks;
				});
			});
		});
	};

	$scope.play = function(track) {
		SC.initialize({
			client_id: 'CLIENT_ID_HERE',
			redirect_uri: "http://localhost:9000/soundfunda/#/play"
		});

		SC.connect(function() {
			SC.get("/tracks/" + track, function(track) {
				SC.oEmbed(track.permalink_url, { auto_play: true}, document.getElementById('player'));
			});
		});
	};
});
