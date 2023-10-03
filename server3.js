var app = require('express')();
var server = require('http').Server(app);
var WebSocketServer = require('websocket').server;
var cors = require('cors')(); //permitir requisicao de outras origens
port=15010;


	

/* https://enable-cors.org/server_expressjs.html */
//app.use(cors());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

io = new WebSocketServer({
	httpServer: server
});

let CLIENTS = [];

io.on('request', function (request) {

	var connection = request.accept(null, request.origin);
	console.log('cliente conectado');
	console.log(request.key);
	
	CLIENTS.push(connection);
	
	connection.on('message', function(message){
	
		if (message.type === 'utf8'){

			try {
				console.log(message.utf8Data);
				
				 //sendAll(message.utf8Data);
				 // ui = message.utf8Data;
				 //connection.send('server: ' + ui , request.key);

				CLIENTS.forEach(s => s.send(message.utf8Data));

			}catch (e){
				console.log("ERRO");
				console.log(e.message);
			}
		}
	});
	connection.on('close', function(e){
			console.log('onclose');
	});

	connection.on('disconnect', function(e){
		console.log('ondisconect');
	});


	function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
    	//CLIENTS[i].send(key);
        CLIENTS[i].send("Message: " + message);
    	
    }
    	
    }

});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});