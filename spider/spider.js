// var dataCollector = (domainUrl, filterUrlRegex, transformJson);

var transformer = require('../applyTransform/transformer.js');
var fs = require('fs');
var url = require('url');
var Crawler = require("crawler").Crawler;
var phantom = require('node-phantom');

var domainToCrawl, topLevelDomainToCrawl;


function spider () {};

var transform = function (aURL, content, transformerDictionary) {
	console.log("transforming");
	transformer.transformURLWithTransformerDictionary(aURL, transformerDictionary, function(err, resultDictionary) {
		console.log("handled" + aURL);
		if (err) {
			console.log("transform error:" + err.message);
		} else {
			if (resultDictionary && resultDictionary !== null) {
				console.log("HI");
				console.log(JSON.stringify(resultDictionary));		
			} else {
				console.log("no data");
			}
		}
	});
}

var shouldQueue = function (currentDomain, aURL) {
	return (currentDomain === url.parse(aURL).hostname);
};

// Call this with e.g. domainToCrawl = 'http://rottentomatoes.com';
spider.run = function(baseURL, transformerDictionary){
	var crawlCount = 1;
	var currentDomain = url.parse(baseURL).hostname;
	var mongo = require('mongoskin');
	var db = mongo.db('localhost:27017/manet');
	
	
	var c = new Crawler({
		"maxConnections":10,
		"skipDuplicates": true,
		// This will be called for each crawled page
		"callback":function(error,result,$) {
			if (error) {
				console.log("crawling error");
			}
			var currentURI = result.uri.replace("http://www.", "http://");
			currentURI = currentURI.replace("http://", "http://www.");
			console.log(currentURI + " was registered ");
			console.log("Applying transformation doc");
			// transform(currentURI, result.body, transformerDictionary);
			transformer.test(currentURI, transformerDictionary, function (err, dictionary){
				console.log("returned");
				console.log(dictionary);
			});
				
			$('a').each(function(index, el){
				var href = $(el).prop('href');				
				if(href && href !== "" && shouldQueue(currentDomain, href)){
					c.queue(href);						
				}
			});
		}
	});

	c.queue(baseURL);
};


module.exports = spider;