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
var expressWs = require('express-ws')(app);

var router = express.Router();
var expressWs = require('express-ws')(router);

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

app.ws('/echo', function(ws, req){console.log('echo')
    ws.on('open', function(handshake){
        console.log("WebSocket connection open");
        
        // get history?
        //   # first message to subscribe channel   
        //   sid << @channel.subscribe {|msg|
        //       #puts "XXX"
        //       puts "received:" + msg + "---"
        //       ws.send msg # send itself
        //       puts "history record"
        //   }
        
        var tid = sid.last;
        console.log(tid, 'connect!');
    })// end of on open
    ws.on('message', function(msg){
        var uid = msg.split(/,/);   // RegExpr
        // channel.push(msg);
        writeDialog(msg);
    }); // end of on message
    
    ws.on('close', function(){
        // channel.unsubscribe(tid);
        console.log(tid, 'connection closed!');
    }); //end of on close

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

app.listen(3000);
// module.exports = app; // 目前用 node bin/www 沒辦法連接 websocket
