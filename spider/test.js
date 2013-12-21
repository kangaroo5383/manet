var spider = require('./spider.js');
var testURL = "http://rottentomatoes.com/";

var response = {
	url: "http://www.rottentomatoes.com/",
	transformer: [{
		key: "comments",
		selector: "html > *:nth-child(2) > *:nth-child(14) > *:nth-child(2) > *:nth-child(1) > *:nth-child(1) > *:nth-child(10) > *:nth-child(2) > *:nth-child(2) P"
	},
	{
		key: "comments2",
		selector: "html > *:nth-child(2) > *:nth-child(14) > *:nth-child(2) > *:nth-child(1) > *:nth-child(1) > *:nth-child(10) > *:nth-child(2) > *:nth-child(2) P"
	}]};

var processInput = function (inputDictionary) {
	var transformer = inputDictionary.transformer;
	var result = {};
	for (var aKey in transformer) {
		result[transformer[aKey]["key"]] = transformer[aKey]["selector"];
	}
	console.log(result);
	return result;
};

var transformerDictionary = processInput(response);
spider.run(testURL, transformerDictionary);