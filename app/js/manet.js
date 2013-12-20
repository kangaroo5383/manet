angular.module("app").
directive("hoverboxmanager", function(selection, Hoverbox, host) {
	return {

		controller: function($scope, $element) {

      var container, potentialHoverbox;

			var matches = function(el, selector) {
				if (!el || el.nodeType !== Node.ELEMENT_NODE) {
					return false;
				}

				var matchesSelector = el.webkitMatchesSelector || el.mozMatchesSelector ||
					el.oMatchesSelector || el.matchesSelector;

				return matchesSelector.call(el, selector);
			};


      var getCurrentSelectedNodes = function(){
        var currentSelectedNodes = [];
        var currentContainer = container.querySelector(".current");
        var hoverboxEls = currentContainer.querySelectorAll(".hoverbox");

        Array.prototype.forEach.call(hoverboxEls, function(hoverboxEl){
          var hoverbox = hoverboxEl.hoverbox;
          currentSelectedNodes.push(hoverbox.node);
        });

        return currentSelectedNodes;
      };


      var setSelectedNodes = function(selector){
        var currentContainer = container.querySelector(".current");
        currentContainer.innerHTML = "";

        var matches = document.querySelectorAll(selection.selectorArrayToString(selector));
        Array.prototype.forEach.call(matches, function(match) {
          var hoverbox = new Hoverbox(match);
          currentContainer.appendChild(hoverbox.hoverbox);
        });
      };


      var addSelectedNode = function(node){
        var currentContainer = container.querySelector(".current");
        var hoverbox = new Hoverbox(node);
        currentContainer.appendChild(hoverbox.hoverbox);
      };


			var targetIsValid = function(target) {
				if (target.tagName === "BODY") {
					return false;
				}

				if (matches(target, ".manet-container *")) {
					return false;
				}

				var currentContainer = container.querySelector(".current");
				var hoverboxes = currentContainer.querySelectorAll(".hoverbox");

				for (var i = hoverboxes.length - 1; i >= 0; i--) {
					var hoverboxEl = hoverboxes[i];
					if (hoverboxEl.node == target) {
						return false;
					}
				}

				return true;
			};


			var drawHoverbox = function(e) {
				var target = e.target;
				if (targetIsValid(target)) {
					potentialHoverbox.hoverbox.style.display = "";
					potentialHoverbox.setNode(target);
				}
			};


			var removeHoverbox = function(e) {
				potentialHoverbox.hoverbox.style.display = "none";
			};


			var addHoverboxesForNodeMatches = function() {
				var matches, matchingSelector;
        var currentSelectedNodes = getCurrentSelectedNodes();

				if (currentSelectedNodes.length > 1) {
          matchingSelector = selection.findMatchingSelectorForNodes(currentSelectedNodes);
				} else {
          matchingSelector = selection.generateSelectorArrayForNode(currentSelectedNodes[0]);
				}

        if($scope.activeField){
          $scope.activeField.selector = matchingSelector;
        }

			};


			var addCurrentHoverbox = function(e) {
				var target = e.target;

				if (targetIsValid(target)) {
					e.preventDefault();
          addSelectedNode(target);
					addHoverboxesForNodeMatches(target);
				}
			};


      var attachListeners = function() {
        document.addEventListener("mouseover", drawHoverbox);
        document.addEventListener("mouseout", removeHoverbox);
        document.addEventListener("click", addCurrentHoverbox);
      };


      var setupContainer = function(){
        container = $element[0];
        var containerHtml = '<div class="potential"></div><div class="current"></div>';
        container.innerHTML = containerHtml;

        potentialHoverbox = new Hoverbox(document.body);
        var potentialContainer = container.querySelector(".potential");
        potentialContainer.appendChild(potentialHoverbox.hoverbox);
      };

      setupContainer();
      attachListeners();


      $scope.$watch("activeField", function(newField) {
        // console.log("activeField: ", newField);
        if (newField && newField.selector) {
          setSelectedNodes(newField.selector);
        }
      });
		}
	};
}).run(function() {
	var container = document.createElement("div");
  // container.setAttribute("ng-controller", "connection");
  container.classList.add("manet-container");

  var sidebar = document.createElement("div");
	sidebar.setAttribute("sidebar", "");
	container.appendChild(sidebar);

  var hoverboxmanager = document.createElement("div");
  hoverboxmanager.setAttribute("hoverboxmanager", "");
  container.appendChild(hoverboxmanager);

	document.body.appendChild(container);
});
angular.bootstrap(document.body, ["app"]);