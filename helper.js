require('./db');
var mongo = require('mongoose');
mongo.Promise = global.Promise;
var Account = mongo.model('accounts');
var Dialog = mongo.model('dialogs');

function Helper(){}

Helper.prototype = {
    // lookup for id    //???
    // function mongo_id(val){
    //     // BSON::ObjectId.from_string(val)
    // }

    // find password by id
    password_by_id: function(uid){
        /*
        id = mongo_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        @password = parsed["password"]
        */
    },
    // find username by id
    username_by_id: function(uid, callback){
        Account.findOne({uid: uid}).exec()
            .catch(function(err){
                console.log('err: ' + err);
            })
            .then(function(data) {
                if(callback && typeof callback === 'function'){
                    if(data.length === 0)
                        callback(0);
                    else
                        callback(data.username);
                }
            })
    },
    // find friends by id
    friends_by_id: function(uid, callback){
        Account.findOne({uid: uid}).exec()
            .catch(function(err){
                console.log('err: ' + err);
            })
            .then(function(data) {
                if(callback && typeof callback === 'function'){
                    if(data.length == 0)
                        callback(0)
                    else
                        callback(data.friends);
                }
            });
    },
    // find history msg by history_id
    history_by_id: function(did, callback){
        Dialog.findOne({did: did}).exec()
            .catch(function(err){
                console.log('err: ' + err);
            })
            .then(function(data){
                if(callback && typeof callback === 'function'){
                    if(data == null){
                        callback(null);
                    } else {                        
                        callback(data)
                    }
                }
            })
    /*
        @history_obj = settings.mongo_db['dialog'].find_one(:did => id).to_json
        #p "`````#{@history_obj.to_s}`````"
        if @history_obj.to_s == "null"
            return nil.to_a.to_json
        else
            his_parsed = JSON.parse(@history_obj)
            ch_log = his_parsed["dialog"]
            return ch_log.to_json
      */
    },
    //   check username exists 
    check_username: function(name, pwd, callback){
        
        Account.findOne({username: name}).exec()
            .catch(function(err){
                console.log("error " + err);
            })
            .then(function(data){
                if(callback && typeof callback === 'function'){
                    if(data == undefined){
                      callback(-1); // account not found
                    } else if(data.password != pwd) {
                        callback(-2); // password incorrect
                    } else {
                        callback(data.uid);
                    } 
                }
            });
    }
}

module.exports = Helper;