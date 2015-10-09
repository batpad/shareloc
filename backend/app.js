var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 1337 });

var users = [];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var data = JSON.parse(message);
    if (data.action === 'register') {
        registerUser(data, ws);
    } else {
        updateLocation(data, ws);
    }
  });


  ws.send(JSON.stringify({
      'action': 'registered'
  }));

});

function registerUser(data, ws) {
    var user = {
        'name': data.name,
        'url': data.url,
        'ws': ws
    };
    users.push(user);
}

function updateLocation(data, ws) {
    var sendData = {
        'action': 'update',
        'name': data.name,
        'coords': data.coords 
    };
    users.forEach(function(user) {
        if (user.url === data.url && user.name !== data.name) {
            console.log("ws object", ws);
            try {
                user.ws.send(JSON.stringify(sendData));
            } catch (e) {
                console.log("tried to send message to user that does not exist");
            }
        }
    });
}