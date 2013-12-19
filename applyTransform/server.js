var http = require('http');
var fs = require('fs');
var restify = require('restify');
var jsdom = require('jsdom').jsdom;
var $ = require('jquery');

var jq = require('jquery').create();
var myWindow = jsdom().createWindow();

var jQuery = require('jquery').create(myWindow);

var aURL = "http://www.rottentomatoes.com/m/the_hunger_games_catching_fire/";

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);

  $("<h1>test passes</h1>").appendTo("body");
  console.log($("body").html());

  jq("<h2>other test passes</h2>").appendTo("body");
  console.log(jq("body").html());

  jQuery("<h3>third test passes</h3>").appendTo("body");
  console.log(jQuery("body").html());

  var content = "";
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
      var rating =  jQuery("#all-critics-meter").html();
      console.log("rating: " + rating);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
});

