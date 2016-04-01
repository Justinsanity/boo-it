/* index.js 
 * express router of au_boo_d.rb 
 */
require('../db');
var Helper = require('../helper');
var helper = new Helper;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('hello');
});

/* action to direct to client to boo ! */
router.get('/friend', function(req, res){
    // if(session[id] == nil){
    if(req.session.uid == undefined){
        req.session = undefined;
        res.redirect('/');
    } else {
        var uid = req.session.uid;
        // MUST to design a random key to hash the session
        // if(uid == mongo_id(session[id])){    // ???
        if(uid){
            // this part needs a algorithm to send ticket mechanism
            
            var p = new Promise(function(resolve, reject){
                helper.username_by_id(uid, function(username){
                    if(username == 0)
                        reject("username is not found");
                    else
                        resolve(username);
                });
            });
            p.then(function(login_usr){
                helper.friends_by_id(uid, function(friends){
                    if(friends == 0)
                        res.send("friends is not found");
                    else                    
                    res.render('friends_list', {
                    	user_name	: login_usr, 
                    	friends_list: friends
                    });
                })
            }, function(error){
                res.send(error);
            });
        } else {
            /*
             this part need to some soliutions
            # 1: clean session(comparison)
            # 2: query DB info. again
            # 3: RANDOM KET SETTING
            #"====#{@session_id}==="
            #session[:id]
            */
            res.send("You are not permissioned to login!");
        }
    }
});

/* client for Boo-it chating! */
router.post('/chat', function(req, res){
    if(req.session.uid == undefined){
        res.session = undefined;
        res.redirect('/');
    } else {
        var uid = req.session.uid;
        // if(res.session.id == mongo_id(res.session.id)){
        if(uid){
            var p = new Promise(function(resolve, reject){
                helper.username_by_id(uid, function(username){
                    if(username == 0)
                        reject("username is not found");
                    else
                        resolve(username);
                });
            });
            p.then(function(login_usr){
                // history send!
                var historyid = [];
                historyid.push(login_usr);
                historyid.push(req.body.chat_f); // chat_f is user that login_usr to chat
                var sort_his_id = historyid.sort();
                var q_history_id = sort_his_id[0] + sort_his_id[1];
                helper.history_by_id(q_history_id, function(history){console.log(history)
                    // history = history == null ? [''] : history
                    res.render('chat', {
                        user_name: login_usr,
                        friend_name: req.body.chat_f,
                        history_msg: history == null ? undefined : history.dialog
                    }); 
                });         
            });
        } else {
            res.send("You are not permissioned to login!");
        }
    }
});

router.get('/redirect', function(req, res){
	res.render('redirect');
})

/* logout and clean the session */
router.get('/logout', function(req, res){
    // session.clear
    res.redirect('/');
});

/* action to lookup database */
router.get('/document/', function(req, res){
    // content_type :json
    // settings.mongo_db['accounts'].find.to_json
    // settings.mongo_db['dialog'].find.to_json
});

/* action to lookup by id */
router.get('/documents/:id', function(req, res){
	var id = req.params.id;
	
	// content_type :json
    // password_by_id(params[:id])
});

router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	helper.check_username(username, password, function(data){
        if(data == -1){        // account not found
            req.session = undefined;
            res.render('404');  // TODO: should not be this page
        } else if(data == -2){ // worng password
            req.session = undefined;
            res.redirect('/');
        } else {
            req.session.uid = data;
            res.redirect('/friend');
        }
	});

});


/*** testing usage ***/

/* mongoDB test */
router.get('/collections', function(req, res){
    // content_type :json
    // settings.mongo_db.collection_names.to_json	
});

/* friends test */
router.get('/test', function(req, res){
    // if(session[:tmp] == nil){
    //     res.send('null');
    // }
    // else{
    //     //haml :test , :locals =>{:tmp => "123"}
    //     res.render('test', {locals: {tmp: '123'}});
    // }
});

router.get('/test_client', function(req, res){
    // session.clear
    res.redirect('/');
});

module.exports = router;