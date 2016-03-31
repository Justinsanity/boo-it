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

router.get('/friend', function(req, res){
	
});

router.post('/chat', function(req, res){
	
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
    // settings.mongo_db['accounts'].find.to_a.to_json
    // settings.mongo_db['dialog'].find.to_a.to_json
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
	
    @username = params[:username]
    @password = params[:password]
    
    check_username(params[:username],params[:password])
    #erb :result
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