var http = require('http');
var fs = require('fs');
var restify = require('restify');
var jsdom = require('jsdom').jsdom;
var $ = require('jquery');

var myWindow = jsdom().createWindow();
var jQuery = require('jquery').create(myWindow);

var format = require('util').format;

var valueForSelectorString = function (selectorString) {
  var output = [];
  jQuery(selectorString).each(function(i, el){
    output.push(jQuery(el).html());
  });
  return output;
};

var processContentAtURLWithTransformerFileURL = function (aURL, transformerDictionary, callback) {
  var content = "";
  var err = null;
  
  http.get(aURL, function(response) {
    if (response.statusCode != 200) {
      callback({message:"file not accessible via http"}, null);
    }
    response.setEncoding('utf8');
    response.on("data", function(chunk){
      content = content + chunk;
    });
    response.on("end", function(){
      myWindow.document.innerHTML = content;
      content = "";
      
      var dictionary = {};
      var valid = false;
      var transformerKeys = Object.keys(transformerDictionary);
      for (var i in transformerKeys) {
        var aKey = transformerKeys[i];
        var selectedValue = valueForSelectorString(transformerDictionary[aKey]);
        if (selectedValue.length > 0) {
          valid = true;
          dictionary[aKey] = selectedValue;
        }
      }
      if (Object.keys(dictionary).length === 0) {
        dictionary = null;
      }

      callback(null, dictionary);
      myWindow.document.innerHTML = "";
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    callback(e, null);
  });  
}

function transformer() {}

transformer.transformURLWithTransformerFile = function (aURL, transformerFile, callback) {
  if (aURL && aURL !== "" && transformerFile && transformerFile !== "") {
    var transformerFileContent = fs.readFileSync(transformerFile);
    var transformerDictionary = JSON.parse(transformerFileContent);
    processContentAtURLWithTransformerFileURL(aURL, transformerDictionary, callback);
  } else {
    console.log("missing parameter in transformURLWithTransformerFile");
  }
};

transformer.transformURLWithTransformerDictionary = function (aURL, transformerDictionary, callback) {
  if (aURL && aURL !== "" && transformerDictionary && transformerDictionary !== "") {
    processContentAtURLWithTransformerFileURL(aURL, transformerDictionary, callback);
  } else {
    console.log("missing parameter in transformURLWithTransformerFile");
  }
};
module.exports = transformer;


