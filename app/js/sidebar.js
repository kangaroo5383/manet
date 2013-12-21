angular.module("ui").
directive("sidebar", function(host) {

	return {
		template: "<div ng-repeat='field in fields'><div class='input-wrapper' ng-click='setActiveField(field);'><input field ng-disabled='!field.appearance.active;' ng-model='field..matches.key' /><span>{{field.appearance.fieldMatchesNodeLength}}</span></div><button class='remove' ng-click='removeField(field)'>×</button></div><button ng-click='addField()'>+</button>",
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