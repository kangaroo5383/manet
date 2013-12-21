var fs = require('fs');
var transformer = require('./transformer.js');
// var aURL = "http://www.rottentomatoes.com/m/the_hunger_games_catching_fire/";
var aURL = "http://www.rottentomatoes.com/m/anchorman_2_the_legend_continues/";

var transformerFile = "/Users/jessicalam/Development/manet/applyTransform/transformer-sample.json";
var sampleTransformDictionary = { comments: 'html > *:nth-child(2) > *:nth-child(14) > *:nth-child(2) > *:nth-child(1) > *:nth-child(1) > *:nth-child(10) > *:nth-child(2) > *:nth-child(2) P',
  comments2: 'html > *:nth-child(2) > *:nth-child(14) > *:nth-child(2) > *:nth-child(1) > *:nth-child(1) > *:nth-child(10) > *:nth-child(2) > *:nth-child(2) P' };

var transform2 = {
	"characters" : ".characters",
	"rating" : "#all-critics-meter"
};

// console.log("1st");
// transformer.transformURLWithTransformerFile(aURL, transformerFile, function(err, resultDictionary) {
// 	if (err || !resultDictionary) {
// 		console.log("no result:");
// 	} else {
// 		console.log(JSON.stringify(resultDictionary));	
// 	}
// });

// console.log("2st");
// transformer.transformURLWithTransformerDictionary(aURL, sampleTransformDictionary, function(err, resultDictionary) {
// 	if (err || !resultDictionary) {
// 		console.log("no result:");
// 	} else {
// 		console.log(JSON.stringify(resultDictionary));	
// 		console.log("hi");
// 	}
// });

transformer.test(aURL, sampleTransformDictionary, function(err, resultDictionary) {
	if (err || !resultDictionary) {
		console.log("no result:");
	} else {
		console.log(JSON.stringify(resultDictionary));	
		console.log("hi");
	}
});


// var testHTML = fs.readFileSync("/Users/jessicalam/Desktop/test2.html", 'utf8');
// console.log("3rd");
// transformer.transformContentWithTransformerDictionary(testHTML, sampleTransformDictionary, function(err, resultDictionary) {
// 	if (err) {
// 		console.log("err");
// 	} else {
// 		if (resultDictionary && resultDictionary != null)  {
// 			console.log(resultDictionary);
// 		}
// 		else {
// 			console.log("no data");
// 		}
// 	}
// });