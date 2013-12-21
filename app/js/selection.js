angular.module("util").
factory("selection", function() {

	return {
		generateSelectorArrayForNode: function(node, selectorArray) {
			selectorArray = selectorArray || [];
			var parent = node && node.parentElement;

			if (parent) {
				// var nodeIndexInParent = Array.prototype.indexOf.call(parent.children, node);
				// selectorArray.unshift(":nth-child(" + (nodeIndexInParent + 1) + ") ");
				// selectorArray.unshift("> *");
				var className = node.className !== "" ? "."+node.className: "";
				if (className!= "") {
					var classnames = className.split(" ");
					className = classnames[0];
				}
				var id = node.id !== "" ? "#" + node.id : "";
				if(!(className === "" && id === "") && node.tagName !== "BODY") {
					selectorArray.unshift(node.tagName+className+id + " ");
				}


				return this.generateSelectorArrayForNode(parent, selectorArray);
			}
			selectorArray.unshift("html ");
			return selectorArray;
		},
		selectorArrayToString: function(selectorArray) {
			return selectorArray.join("").trim();
		},
		findMatchingSelectorForNodes: function(nodes) {
			var selectorArray;
			var classNamesMatch = nodes[0].getAttribute("class");
			var tagNamesMatch = nodes[0].tagName;
			var specificityReduced;
			nodes.forEach(function(node) {
				var selector = this.generateSelectorArrayForNode(node);
				if (classNamesMatch && classNamesMatch !== classNamesMatch.getAttribute("class")) {
					classNamesMatch = false;
				}
				if (tagNamesMatch && tagNamesMatch !== node.tagName) {
					tagNamesMatch = false;
				}
				if (!selectorArray) {
					selectorArray = selector;
				} else {
					for (var i = 0; i < selectorArray.length; i += 1) {
						if (selectorArray[i] !== selector[i]) {
							selectorArray.splice(i, selectorArray.length);
							specificityReduced = true;
							break;
						}
					}
				}
			}, this);
			if (specificityReduced) {
				selectorArray.pop();
				selectorArray.push(
					(tagNamesMatch || "") +
					((classNamesMatch && this.generateClassSelectorFromNode(classNamesMatch)) || "")

				);
			}
			return selectorArray;

		},
		generateClassSelectorFromNode: function(node) {
			var classes = node.getAttribute("class");
			if (classes) {
				classes = classes.split(" ");
				return "." + classes.join(".");
			}
			return null;
		}
	};

});

// Alogorithm notes
// html body *:nth-child(1) *:nth-child(1) *:nth-child(1) *:nth-child(1) *:nth-child(1) //.blahBorder

// html body *:nth-child(1) *:nth-child(1) *:nth-child(2) *:nth-child(2) *:nth-child(1) //.blahBorder

// html body *:nth-child(1) *:nth-child(1) *:nth-child(4) *:nth-child(3) *:nth-child(1) //.blahBorder


// html body div table:nth-child(1) tdbody tr:nth-child(1) td:nth-child(1) div:nth-child(1) h1:nth-child(1)
// html body div table:nth-child(1) tdbody tr:nth-child(1) td:nth-child(1) div:nth-child(1) h1:nth-child(1)
// html body div table:nth-child(1) tdbody tr:nth-child(1) td:nth-child(1) div:nth-child(1) h1:nth-child(1)
// html body div table:nth-child(1) tdbody tr:nth-child(1) td:nth-child(1) div:nth-child(1) h1:nth-child(1)