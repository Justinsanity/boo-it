
var mongo = require('mongoose');
var Dialog = mongo.model('dialogs');
mongo.Promise = global.Promise;

function writeDialog(msg){
    var _currentTime = Date.now();
    var _logAry = msg.split(',');          // "from, to, log"
    var _sortAry = ([_logAry[0], _logAry[1]]).sort();
    var _did = _sortAry[0] + _sortAry[1]; // dialog id is 'test1test2', means test1-to-test2 
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
            data[0].dialog.push({
               from : _logAry[0],
               to   : _logAry[1],
               datetime: _currentTime,
               content : _logAry[2]
            });
            data[0].save();
        }
    })
}

module.exports = writeDialog;
