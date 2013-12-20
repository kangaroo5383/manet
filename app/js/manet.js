angular.module("app", ["util", "ui"]).
run(function(selection, Hoverbox) {
	var model = {
		selections: []
	};
	var uiContainer, currentHoverbox;

	// Duplicate, refactor
	var hoverboxHtml = '<div class="remove"></div><div class="options"><input type="text" placeholder="Name"><div class="duplicate"></div></div>';

	var setHoverboxNode = function(hoverbox, node) {
		var rect = node.getBoundingClientRect();
		hoverbox.style.left = rect.left + "px";
		hoverbox.style.top = rect.top + "px";
		hoverbox.style.width = rect.width + "px";
		hoverbox.style.height = rect.height + "px";
		hoverbox.originalNode = node;
	};

	var setupHoverboxEvents = function(hoverbox) {
		var remove = hoverbox.querySelector(".remove");
		remove.addEventListener("click", function(e) {
			hoverbox.parentElement.removeChild(hoverbox);
		});
	};

	var createHoverboxFromNode = function(node) {
		var hoverbox = document.createElement("div");
		var matches;
		hoverbox.classList.add("hoverbox");
		setHoverboxNode(hoverbox, node);
		hoverbox.innerHTML = hoverboxHtml;
		setupHoverboxEvents(hoverbox);
		model.selections.push(node);

		// Just a test to see if this works
		if (model.selections.length > 1) {
			console.log(selection.generateClassSelectorFromNode(node));
			matches = document.querySelectorAll(
				selection.selectorArrayToString(selection.findMatchingSelectorForNodes(model.selections))
			);
		} else {
			matches = document.querySelector(
				selection.selectorArrayToString(selection.generateSelectorArrayForNode(node))
			);
		}

		console.log(matches)


		// hoverbox.querySelector("input").addEventListener("input", function() {
		// 	if (lastValue) {
		// 		delete model.sections[lastValue];
		// 	}
		// 	model.sections[this.value] =
		// 		lastValue = this.value
		// });
		return hoverbox;
	};

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
			if (hoverboxEl == target) {
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



	var addCurrentHoverbox = function(e) {
		e.preventDefault();
		var target = e.target;
		if (targetIsValid(target)) {
			var hoverbox = createHoverboxFromNode(target);
			uiContainer.querySelector(".current").appendChild(hoverbox);
		}
	};


	var redrawHoverboxes = function(e) {
		var hoverboxes = uiContainer.querySelectorAll(".hoverbox");
		for (var i = hoverboxes.length - 1; i >= 0; i--) {
			var hoverbox = hoverboxes[i];
			setHoverboxNode(hoverbox, hoverbox.originalNode);
		}
	};


	var attachListeners = function() {
		document.addEventListener("mouseover", drawHoverbox);
		document.addEventListener("mouseout", removeHoverbox);
		document.addEventListener("click", addCurrentHoverbox);
		document.addEventListener("scroll", redrawHoverboxes);
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