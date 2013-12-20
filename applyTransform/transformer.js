var http = require('http');
var fs = require('fs');
var restify = require('restify');
var jsdom = require('jsdom').jsdom;
var $ = require('jquery');

var jq = require('jquery').create();
var myWindow = jsdom().createWindow();
var jQuery = require('jquery').create(myWindow);

var valueForSelectorString = function (selectorString) {
  var output = [];
  jQuery(selectorString).each(function(i, el){
    output.push(jQuery(el).html());
  });
  return output;
};

var processContentAtURLWithTransformerFileURL = function (aURL, transformerFile) {
  var content = "";
  var transformerFileContent = fs.readFileSync(transformerFile);
  var transformerDictionary = JSON.parse(transformerFileContent);

  http.get(aURL, function(response) {
    if (response.statusCode != 200) {
      console.log("file not accessible via http");
    }
    response.setEncoding('utf8');
    response.on("data", function(chunk){
      content = content + chunk;
    });
    response.on("end", function(){
      myWindow.document.innerHTML = content;
      content = "";
      
      var dictionary = {};
      dictionary["documentURL"] = aURL;
      var transformerKeys = Object.keys(transformerDictionary);
      for (var i in transformerKeys) {
        var aKey = transformerKeys[i];
        dictionary[aKey] = valueForSelectorString(transformerDictionary[aKey]);
      }

      console.log(JSON.stringify(dictionary));

      //clear the window because it causes error
      myWindow.document.innerHTML = "";
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });  
}

function transformer() {

}
transformer.transformURLWithTransformerFile = function (aURL, transformerFile) {
  processContentAtURLWithTransformerFileURL(aURL, transformerFile);  
}

module.exports = transformer;


