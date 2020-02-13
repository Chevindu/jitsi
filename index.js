var express = require('express');
var cors = require('cors')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('static'));

io.on('connection', function (socket) {
	console.log('a client connected');

	socket.on('up', () => {
		console.log('Input command: UP');
		socket.broadcast.emit('up');
	});
	socket.on('down', () => {
		console.log('Input command: DOWN');
		socket.broadcast.emit('down');
	});
	socket.on('left', () => {
		console.log('Input command: LEFT');
		socket.broadcast.emit('left');
	});
	socket.on('right', () => {
		console.log('Input command: RIGHT');
		socket.broadcast.emit('right');
	});
	socket.on('upright', () => {
		console.log('Input command: UP RIGHT');
		socket.broadcast.emit('upright');
	});
	socket.on('downright', () => {
		console.log('Input command: DOWN RIGHT');
		socket.broadcast.emit('downright');
	});
	socket.on('upleft', () => {
		console.log('Input command: UP LEFT');
		socket.broadcast.emit('upleft');
	});
	socket.on('downleft', () => {
		console.log('Input command: DOWN LEFT');
		socket.broadcast.emit('downleft');
	});
	socket.on('brake', () => {
		console.log('Input command: BRAKE');
		socket.broadcast.emit('brake');
	});
	
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('error', (error) => {
		console.log('Error: ', error);
	});
});

http.listen(port, () => {
	console.log('Listening at port: ', port);
	console.log('On localhost, visit: http://localhost:3000');
});