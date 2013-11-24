var socket = require('socket.io');

function findClientSocket ( arr, socket ) {
	for ( var i = 0; i < arr.length; ++i ){
		if ( arr[i].socket === socket )
			return i;
	}
	console.log('error finding socket');
	return -1;
}
function findClientId ( arr, id ) {
	for ( var i = 0; i < arr.length; ++i ){
		if ( arr[i].id == id )
			return i;
	}
	console.log('error finding socket');
	return -1;
}

module.exports.listen = function(app){
    io = socket.listen(app);

	//holds all clients 
	var clients = new Array ();

	io.sockets.on('connection',function(socket) {
	
		socket.on('addUser', function(data){
			for ( var i = 0; i < clients.length; ++i ){
				socket.emit('addUser', { id:clients[i].id });
			}
			clients.push({socket:socket,
						  id:data.id});
			socket.broadcast.emit('addUser',data);
		});

		socket.on('addPath', function(data) {
			socket.broadcast.emit('addPath',data);
		});

		socket.on('addPoint', function(data){
			socket.broadcast.emit('addPoint',data);
		});
		socket.on('getCanvas', function(data){
			if (clients.length > 1){
				clients[0].socket.emit('getCanvas',{ id:data.id});
			}
		});
		socket.on('returnCanvas', function(data){
			console.log("&&&&&&&    " + data.id );
			var targetSocket = findClientId(clients,data.id);
			clients[targetSocket].socket.emit('returnCanvas', { canvas_json:data.canvas_json });
		});
		socket.on('disconnect', function(){
			var index = findClientSocket( clients, socket);	
			socket.broadcast.emit('removeUser', { id:clients[index].id});
			clients.splice(index,1);
		});

		
	});
    return io;
};
