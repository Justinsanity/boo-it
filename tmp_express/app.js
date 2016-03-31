// require('./db'); // db.js should be called before others being called so that other sevices can access to database
var express = require('express');
var path = require('path');
var http = require('http');
var engine = require('consolidate');

/* routers */
var index = require('./routes/index');
var chat = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* routers */
app.use('/', index);
app.use('/chat', chat);

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
