angular.module("ui").
directive("sidebar", function(host) {

	return {
		template: "<div ng-repeat='field in fields'><div class='input-wrapper' ng-click='setActiveField(field);'><input placeholder='Untitled' field ng-disabled='!field.appearance.active;' ng-model='field.matches.key' /><span ng-show='field.appearance.fieldMatchesNodeLength'>{{field.appearance.fieldMatchesNodeLength}}</span><button class='remove' ng-click='removeField(field)'>×</button></div></div><button ng-click='addField()'>+</button>",
		controller: function($scope, $element) {

			$scope.setActiveField = function(activeField) {
				$scope.fields.forEach(function(field) {
					if (field.appearance.active) {
						field.appearance.active = false;
					}
				});
				activeField.appearance.active = true;
				$scope.activeField = activeField;
			};

			$scope.addField = function() {
				var fieldModel = {
					matches: {
						key: "",
						selector: null
					},
					appearance: {
						active: null,
						fieldMatchesNodeLength: null
					}
				};
				$scope.fields.push(fieldModel);
				$scope.setActiveField(fieldModel);
			};

			$scope.removeField = function(field) {
				var fieldIndex = $scope.fields.indexOf(field);
				$scope.fields.splice(fieldIndex, 1);
				if (fieldIndex === 0) {
					$scope.activeField = false;
				}
			};

			debug = $scope

		}
	};

}).
directive("field", function($timeout) {

	return {
		controller: function($scope, $element) {
			$scope.$watch("field.appearance.active", function(isActive) {
				if (isActive) {
					$timeout(function() {
						$element[0].focus();
					});
				}

			})
		}
	};

});