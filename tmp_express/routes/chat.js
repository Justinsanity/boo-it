
var express = require('express');
var mongoose = require('mongoose');
var Dialog = mongoose.model('dialog');

mongoose.Promise = global.Promise;
var router = express.Router();

/*
router.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});
*/

function writeDialog(msg){
    var _currentTime = Date.now();
    var _logAry = msg.split(',');          // "from, to, log"
    var _sortAry = ([_logAry[0], _logAry[1]]).sort();
    var _did = _sortAry[0] + _sortAry[1]; // calcuate next id
    
    Dialog.find({ did: _did }).exec()
    .catch(function(err){
        console.log("error " + err);
    })
    .then(function(data){
        if(data.length == 0){ // if not found , then insert
        
            var dialog = new Dialog;
            dialog.did = _did;
            dialog.dialog = [{
               from : _logAry[0],
               to   : _logAry[1],
               datetime: _currentTime,
               content : _logAry[2]
            }];
            dialog.save();
        } else {            // if found, update it
            data.dialog.push({
               from : _logAry[0],
               to   : _logAry[1],
               datetime: _currentTime,
               content : _logAry[2]
            });
            data.save();
        }
    })
}

var uid = []
var sid = []
var channel_list = []

router.ws('/chat', function(ws, req){
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
        
        ws.on('message', function(msg){
            var uid = msg.split(/,/);   // RegExpr
            // channel.push(msg);
            writeDialog(msg);
        }); // end of on message
        
        ws.on('close', function(){
            // channel.unsubscribe(tid);
            console.log(tid, 'connection closed!');
        }); //end of on close
    })// end of on open
});

module.exports = router;