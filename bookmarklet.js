(function() {
	var scriptToInject = '//localhost:9999/js/app.js';
	var newScript = document.createElement('script');
	newScript.src = scriptToInject;
	document.head.appendChild(newScript);

  var cssToInject = '//localhost:9999/manet.styl.css';
  var link = document.createElement('link');
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = cssToInject;
  document.head.appendChild(link);
}());