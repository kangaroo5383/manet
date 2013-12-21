angular.module("ui").
directive("sidebar", function(host) {

	return {
		template: "<div ng-repeat='field in fields'><button ng-click='removeField(field)'>×</button><div ng-click='setActiveField(field);'><input field ng-disabled='!field.active;' ng-model='field.key' /></div></div><button ng-click='addField()'>+</button>",
		controller: function($scope, $element) {

			$scope.setActiveField = function(activeField) {
				$scope.fields.forEach(function(field) {
					if (field.active) {
						field.active = false;
					}
				});
				activeField.active = true;
				$scope.activeField = activeField;
			};

			$scope.addField = function() {
				var fieldModel = {
					key: "",
					selector: null,
					active: null
				};
				$scope.fields.push(fieldModel);
				$scope.setActiveField(fieldModel);
			};

			$scope.removeField = function(field) {
				var fieldIndex = $scope.fields.indexOf(field);
				$scope.fields.splice(fieldIndex, 1);
			};

			debug = $scope.fields

		}
	};

}).
directive("field", function($timeout) {

	return {
		controller: function($scope, $element) {
			$scope.$watch("field.active", function(isActive) {
				if (isActive) {
					$timeout(function() {
						$element[0].focus();
					});
				}

			})
		}
	};

});