
var config   = require('./config')
    , mongoose = require('mongoose')
    , express = require('express')
    , routes = require('./routes')
    , middleware = require('./middleware')
    , http = require('http')
    , gravatar = require('gravatar')
    , port =  config.port
    , app = express()
    , server = http.createServer(app)
    , io = require('socket.io').listen(server)
    , sockets = require('./sockets')

mongoose.set('debug', true);
console.log(config.db, '----------------------------------------------------------------------------');
mongoose.connect(config.db , function (err) {
    if (err) throw err;
    console.log('mongoose db connected to' + config.db);
    var publicDirectory = __dirname;

    server.listen(port, function() {
        console.log('Chat server running Express listening on port ' +  port);
    })

    middleware(app, publicDirectory)
    routes(app)
    sockets(io)

})
