angular.module("ui").
constant("postToURL", "http://localhost/").
controller("connection", function($scope, $http, $location, postToURL) {
	$scope.activeField = null;
	$scope.fields = [];

	$scope.$watch("fields", function(fields) {
		if (!fields) {
			return;
		}
		$http.post(postToURL, {
			url: $location.$$absUrl,
			transformer: $scope.fields
		}).success(function(e) {
			// Do something here.
			console.log(e);
		});
	}, true);
});