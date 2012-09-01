var http = require('http');
var path = require('path');
var fs = require('fs');

var WEB_ROOT = '../client';

http.createServer(function (request, response) {
	
	console.log("Request for url: "+request.url);

	var filePath = WEB_ROOT+request.url;
	if(filePath == WEB_ROOT+'/')
		filePath = WEB_ROOT+'/index.html';

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch(extname)
	{
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}

	fs.exists(filePath, function(exists) {

		if(exists) 
		{
			fs.readFile(filePath, function(error, content) {
				if(error) {
					console.log("Unable to read file: "+filePath);
					response.writeHead(500);
					response.end();
				}
				else {

					response.writeHead(200, {'Content-Type':contentType});
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			console.log("Can't find file: "+filePath);
			response.writeHead(404);
			response.end();
		}
	});
}).listen(1337);

console.log('Server running at http://127.0.0.1:8125/');
