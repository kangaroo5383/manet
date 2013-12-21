// var dataCollector = (domainUrl, filterUrlRegex, transformJson);

var transformer = require('../applyTransform/transformer.js');

var domainToCrawl, topLevelDomainToCrawl;
var crawlCount = 1;

function getHostname(url) {
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
	var domain = matches && matches[1];
	return domain;
}

function getTopLevelDomain(url){
	var topLevelDomain = null;
	var hostname = getHostname(url);
	
	if(hostname != null){	
		// we handle the case where no hostname exists in the URL, 
		// e.g. if it's not a properly formed href, or it's javascript or something 			
		var hostnameParts = hostname.split('.');
		
		// the top level domain is the last two parts of the hostname (i.e. 
		// we want something like rottentomatoes.com 
		// regardless of if it's dev.rottentomatoes.com, or www.rottentomatoes.com etc.
		topLevelDomain = hostnameParts.slice(hostnameParts.length - 2).join('.');
	}
	
	return topLevelDomain;
}

function spider () {};

var transform = function (content, transformerDictionary) {
		transformer.transformContentWithTransformerDictionary(content, {
		characters : ".characters",
		rating : "#all-critics-meter"
	}, function(err, resultDictionary) {
		if (err) {
			console.log("some error:" + err.message);
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
// Call this with e.g. domainToCrawl = 'http://rottentomatoes.com';
spider.run = function(domainToCrawl){

	
	var mongo = require('mongoskin');
	var db = mongo.db('localhost:27017/manet');
	
	var Crawler = require("crawler").Crawler;
	
	var c = new Crawler({
		"maxConnections":10,
		// This will be called for each crawled page
		"callback":function(error,result,$) {

			console.log("queued: " + result.uri);
			transform(result.body, {});

			$('a').each(function(index){
				// We don't want to follow links that are not on the same top level domain
				// or ones that have things like javascript(0) in their href, so we
				// select only links that have an href that starts with a '/' and has
				// some text after - we exclude just the / since that's the starting point
				// we feed in.			
				var href = $(this).prop('href').replace('www.','');
				
				var topLevelDomain = getTopLevelDomain(href); 
				
			
				if(topLevelDomain == topLevelDomainToCrawl){
	
					db.collection('urls').findById(href, function(err, result){
						console.log(result);
						if(result == null){
							console.log("Crawling " + href);
							crawlCount++;
							console.log("Crawl Count: " + crawlCount);
							db.collection('urls').insert({_id: href, crawl: 1}, {}, function(err,result){
								//console.log(result);
								if(err == null){
									console.log(href + " was registered ");
									console.log("Applying transformation doc");
									
								}
								
							});
		 					c.queue(href);
		 				}
						else{
							console.log('Already crawled ' + href);
						}						
					});
						
				}
				
			});
			
		}
	});

	topLevelDomainToCrawl = getTopLevelDomain(domainToCrawl); 
	
	db.collection('urls').insert({_id: domainToCrawl, crawl: '1'}, function(err,result){
		console.log(result);
		console.log(domainToCrawl + " was registered ");
	});

	c.queue(domainToCrawl);

};


module.exports = spider;