// Create web server
// Run `node comment.js` to start the server
// Access the server at http://localhost:3000

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  switch (path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('hello world');
      response.end();
      break;
    case '/index.html':
      fs.readFile(__dirname + path, function(error, data) {
        if (error) {
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
          response.end();
        } else {
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(data, 'utf8');
          response.end();
        }
      });
      break;
    case '/comment':
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write('You have sent: ' + url.parse(request.url, true).query['comment']);
      response.end();
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});

// Listen on port 3000, IP defaults to