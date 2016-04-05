// require('./db'); // db.js should be called before others being called so that other sevices can access to database
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var session = require('express-session');

/* routers */
var index = require('./routes/index');
var writeDialog = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// other configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true}));

/* routers */
app.use('/', index);

// websocket server
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8080 })
  , url = require('url');

wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions 
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 

    ws.on('message', function incoming(message) {
        console.log('onmessage, received: %s', message);
        var uid = message.split(/,/);   // RegExpr
        writeDialog(message);
        wss.clients.forEach(function each(client) {     // broadcast to all client // TODO: 不是這個 dialog 的？ 
             client.send(message)
        });
    }); 
    
    ws.on('close', function(){
        // channel.unsubscribe(tid);
        console.log('onclose');
        ws.send('websocket closed')
    });
});

// 404 and forward to error handler
app.use(function(req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
    res.render('404');
});

// DEVELOPMENT ERROR handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// PRODUCTION ERROR handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
