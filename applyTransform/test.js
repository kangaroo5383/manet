var transformer = require('./transformer.js');
var aURL = "http://www.rottentomatoes.com/m/the_hunger_games_catching_fire/";
// var aURL = "http://www.macrumors.com/";

var transformerFile = "/Users/jessicalam/Development/manet/applyTransform/transformer-sample.json";

transformer.transformURLWithTransformerFile(aURL, transformerFile, function(err, resultDictionary) {
	if (err || !resultDictionary) {
		console.log("no result:");
	} else {
		console.log(JSON.stringify(resultDictionary));	
	}
});

transformer.transformURLWithTransformerDictionary(aURL, {
	characters : ".characters",
	rating : "#all-critics-meter"
}, function(err, resultDictionary) {
	if (err || !resultDictionary) {
		console.log("no result:");
	} else {
		console.log(JSON.stringify(resultDictionary));	
	}
});