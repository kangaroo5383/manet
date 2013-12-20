angular.module("util", []);
angular.module("ui", []);
angular.module("app", ["util", "ui"]).
value("host", "http://localhost:9999");