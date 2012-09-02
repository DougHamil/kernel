var WEB_ROOT = '../client';
var staticServer = require('./kernel/staticserver').createServer(1337, WEB_ROOT);
var io = require('socket.io').listen(staticServer.getHTTPServer());
var playerManager = require('./kernel/playermanager');

io.sockets.on('connection', function(socket) {
	var thisPlayer = playerManager.registerPlayerSocket(socket);

	socket.emit('init', {id:thisPlayer.id});

	playerManager.each(function(player) {
		player.socket.emit('playerjoin', {id:player.id});
	}, thisPlayer);

	socket.on('position', function(data) {
		playerManager.each(function(player) {
			player.socket.emit('position',{id:thisPlayer.id, x:data.x, y:data.y});
		});
	}, thisPlayer);
});
