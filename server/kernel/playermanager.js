exports.registerPlayerSocket = registerPlayerSocket;
exports.getNumberOfPlayers = getNumberOfPlayers;
exports.each = foreachSocket;

var players = [];
var nextId = 0;
function registerPlayerSocket(socket)
{
	var player = { id:nextId++, socket:socket};
	players.push(player);
	return player;
}

function getNumberOfPlayers()
{
	return players.length;
}

function foreachSocket(func, except)
{
	for(var p in players)
	{
		if(players[p] == except)
			continue;

		func(players[p]);
	}
}
