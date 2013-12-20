angular.module("app", ["util"]).
run(function (selection) {
	console.log(selection)
});
angular.bootstrap(document.documentElement, ["app"]);