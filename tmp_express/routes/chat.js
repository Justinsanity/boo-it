
var express = require('express');
var mongoose = require('mongoose');
var Dialog = mongoose.model('dialog');

mongoose.Promise = global.Promise;
var router = express.Router();

router.ws('/history', function(req, res){
    var history = req.body.history;
    var _currentTime = Date.now();
    var _logAry = history.split(',');          // "from, to, log"
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
});

router.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});

/*
#
# chat server 
#
puts "Server is listening!..."
@uid = []
@sid = []
@channel_list = []

EM.run {
    @channel = EM::Channel.new
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen { |handshake|
      puts "WebSocket connection open"
      # first message to subscribe channel
      @sid << @channel.subscribe {|msg|
          #puts "XXX"
          puts "received:" + msg + "---"
          ws.send msg # send itself
          puts "history record"
      }
      tid = @sid.last
      puts "#{@sid.last} connect!"
      ws.onmessage {|msg|
          @uid = msg.split(/,/)
          @channel.push "#{msg}"
          boo_log(msg.to_s)
      }

      ws.onclose {
          @channel.unsubscribe(tid)
          puts "#{tid} conection closed!"
      }
    }  # onopen end
  end
}
*/

module.exports = router;