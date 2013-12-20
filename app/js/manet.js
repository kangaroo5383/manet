angular.module("app", ["util", "ui"]).
run(function(selection, Hoverbox) {
	var model = {
		selections: []
	};

	var uiContainer, currentHoverbox;


	var matches = function(el, selector) {
		if (!el || el.nodeType !== Node.ELEMENT_NODE) {
			return false;
		}

		var matchesSelector = el.webkitMatchesSelector || el.mozMatchesSelector ||
			el.oMatchesSelector || el.matchesSelector;

		return matchesSelector.call(el, selector);
	};


	var targetIsValid = function(target) {
		if (target.tagName === "BODY") {
			return false;
		}

		if (matches(target, ".manet-container *")) {
			return false;
		}

		var currentContainer = uiContainer.querySelector(".current");
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
			currentHoverbox.hoverbox.style.display = "";
			currentHoverbox.setNode(target);
		}
	};


	var removeHoverbox = function(e) {
		currentHoverbox.hoverbox.style.display = "none";
	};


	var addHoverboxesForNodeMatches = function(node) {
		var matches;
		model.selections.push(node);
		// Just a test to see if this works
		if (model.selections.length > 1) {
			matches = document.querySelectorAll(
				selection.selectorArrayToString(selection.findMatchingSelectorForNodes(model.selections))
			);
			Array.prototype.forEach.call(matches, function(match) {
				var hoverbox = new Hoverbox(match);
				hoverbox.hoverbox.style.outline = "2px dotted grey";
				hoverbox.hoverbox.style.background = "rgba(22,22,22,0.2)";
				uiContainer.querySelector(".current").appendChild(hoverbox.hoverbox);
			});
		} else {
			matches = document.querySelector(
				selection.selectorArrayToString(selection.generateSelectorArrayForNode(node))
			);
		}
	};


	var addCurrentHoverbox = function(e) {
		e.preventDefault();
		var target = e.target;
		if (targetIsValid(target)) {
			addHoverboxesForNodeMatches(target);
			var hoverbox = new Hoverbox(target);
			uiContainer.querySelector(".current").appendChild(hoverbox.hoverbox);
		}
	};


	var attachListeners = function() {
		document.addEventListener("mouseover", drawHoverbox);
		document.addEventListener("mouseout", removeHoverbox);
		document.addEventListener("click", addCurrentHoverbox);
	};


	var containerHtml = '<div class="potential"></div><div class="current"></div>';

	var createContainer = function() {
		var container = document.createElement("div");
		container.classList.add("manet-container");
		container.innerHTML = containerHtml;
		document.body.appendChild(container);

		currentHoverbox = new Hoverbox(document.body);
		container.querySelector(".potential").appendChild(currentHoverbox.hoverbox);

		return container;
	};


	uiContainer = createContainer();
	attachListeners();
});
angular.bootstrap(document.body, ["app"]);