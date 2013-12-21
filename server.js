var restify = require('restify');
var spider = require('./spider/spider.js');
function respond(req, res, next) {
  res.send('hello ' + req.params.name);
}

var server = restify.createServer();

var post = function(req, res, next) {
	console.log("hi");
	console.log(req.params);
};

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.post('/hello', put);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});