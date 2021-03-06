var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo-websocket');

var dict = require(__dirname + '/config/dictionary.json');
var clientProtos = require(__dirname + '/config/clientProtos.json');

var handshake = function (msg, cb) {
    console.log('handshake msg: ', msg);
    cb(null, {
    	code:200, 
    	sys:{
    		heartbeat: 30,
    		dict: dict,
    		protos: clientProtos
    	}
    });
}

// app configuration
app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			heartbeat : 30,
			useDict : true,
			useProtobuf : true,
			handshake: handshake
		});
});

app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			useDict : true,
			useProtobuf : true,
			handshake: handshake
		});
});

// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);

	// filter configures
	app.filter(pomelo.timeout());
});

// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});