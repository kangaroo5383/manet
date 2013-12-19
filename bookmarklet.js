(function() {
	var scriptToInject = "//localhost/bootstrap.js";
	var newScript = document.createElement("script");
	newScript.src = scriptToInject;
	document.head.appendChild(newScript);
}());