/* index.js 
 * express router of au_boo_d.rb 
 */
require('../db');
require('../helper');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('hello');
});

/* action to direct to client to boo ! */
router.get('/friend', function(req, res){
    if(session[id] == nil){
        // session.clear
        res.redirect('/');
    } else {
        // MUST to design a random key to hash the session
        if(session[id] == mongo_id(session[id])){
            // this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[id])
            friends_json = friends_by_id(session[id])
            res.render('friends_list', {
            	locals: {
            		user_name	: login_usr, 
            		friends_list: friends_json
            	}
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
    if(session[id] == nil){
        // session.clear
        res.redirect('/');
    } else {
        if(session[id] == mongo_id(session[id])){
            // this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[id])
            // history send!
            historyid = []
            historyid.push(login_usr)
            historyid.push(params[chat_f])
            sort_his_id = historyid.sort
            q_history_id = sort_his_id[0] + sort_his_id[1]
            history_json = history_by_id(q_history_id)
            res.render('chat', {
            	locals: {
            		user_name: login_usr,
            		friend_name: params[chat_f],
            		history_msg: history_json
            	}
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
	
    var username = params[username]
    var password = params[password]
    
    check_username(params[username],params[password])
    // erb :result
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