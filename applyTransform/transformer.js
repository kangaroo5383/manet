var http = require('http');
var fs = require('fs');
var restify = require('restify');
var jsdom = require('jsdom').jsdom;
var $ = require('jquery');

var myWindow = jsdom().createWindow();
var jQuery = require('jquery').create(myWindow);

var format = require('util').format;
var jsPhantom = require('node-phantom');

var valueForSelectorString = function (selectorString) {
  var output = [];
  jQuery(selectorString).each(function(i, el){
    output.push(jQuery(el).html());
  });
  return output;
};
var transformContentWithTransformerDictionary = function (content, transformerDictionary, callback) {
  myWindow.document.innerHTML = content;
  var dictionary = {};
  var valid = false;
  var transformerKeys = Object.keys(transformerDictionary);
  for (var i in transformerKeys) {

    var aKey = transformerKeys[i];
    console.log(aKey);
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
};

var processContentAtURLWithTransformerFileURL = function (aURL, transformerDictionary, callback) {
  var content = "";
  var err = null;
  
  http.get(aURL, function(response) {
    if (response.statusCode != 200) {
      console.log("status: " + response.statusCode);
      callback({message:"file not accessible via http"}, null);
    }
    response.setEncoding('utf8');
    response.on("data", function(chunk){
      content = content + chunk;
    });
    response.on("end", function(){
      transformContentWithTransformerDictionary(content, transformerDictionary, callback);
      content = "";
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    callback(e, null);
  });  
}

var test = function (aURL, transformerDictionary) {
  var that = this;
  jsPhantom.create(function(err,ph) {
    if (err) {
      console.log(err);
    } else {
      console.log("hi");
    }
    return ph.createPage(function(err,page) {
      return page.open(aURL, function(err,status) {
        console.log("opened site? ", status);
        page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
          if(err) {
            console.log(err);
          }
          //jQuery Loaded.
        //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
        setTimeout(function() {
          return page.evaluate(function() {
            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
            var h2Arr = [],
            pArr = [];


            $('html > *:nth-child(2) > *:nth-child(14) > *:nth-child(2) > *:nth-child(1) > *:nth-child(1) > *:nth-child(10) > *:nth-child(2) > *:nth-child()').each(function() {
              pArr.push($(this).html());
            });

            return {
              h2: h2Arr,
              p: pArr
            };
          }, function(err,result) {
            console.log(result);
            ph.exit();
          });
        }, 5000);
        });
      });
    });
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
    console.log("missing parameter in transformURLWithTransformerDictionary");
  }
};

transformer.transformContentWithTransformerDictionary = function (content, transformerDictionary, callback) {
  transformContentWithTransformerDictionary(content, transformerDictionary, callback);
};

transformer.test = function (aURL, transformerDictionary, callback) {
  test(aURL, transformerDictionary, callback);
}
module.exports = transformer;


