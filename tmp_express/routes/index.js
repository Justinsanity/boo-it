/* index.js 
 * express router of au_boo_d.rb 
 */
require('../db');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	haml :hello
});

router.get('/friend', function(req, res){
	
});

router.post('/chat', function(req, res){
	
});

router.get('/test_client', function(req, res){
    session.clear
    redirect 'hello'	
});

router.get('/redirect', function(req, res){
	haml :redirect
})

/* logout and clean the session */
router.get('/logout', function(req, res){
    session.clear
    redirect 'hello'	
});

/* action to lookup database */
router.get('/document/', function(req, res){
    content_type :json
    #settings.mongo_db['accounts'].find.to_a.to_json
    settings.mongo_db['dialog'].find.to_a.to_json
});

/* action to lookup by id */
router.get('/documents/:id', function(req, res){
	var id = req.params.id;
	
	content_type :json
    password_by_id(params[:id])
});

router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	
    @username = params[:username]
    @password = params[:password]
    
    check_username(params[:username],params[:password])
    #erb :result
});

/* mongoDB test */
router.get('/collections', function(req, res){
    content_type :json
    settings.mongo_db.collection_names.to_json	
});

/* friends test */
router.get('/test', function(req, res){
    if session[:tmp] == nil
        "nil"
    else
        haml :test , :locals =>{:tmp => "123"}
    end	
});
