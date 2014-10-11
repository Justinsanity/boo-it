require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext'
require 'json'
require 'haml'
include Mongo
#
# configuration for setting
#
configure do 
    enable :sessions

    # this place must implement a random secret key generation
    set :session_secret, 'booit' 
    conn = MongoClient.new("localhost",27017)
    set :mongo_connection, conn
    set :mongo_db, conn.db('Boo')
end
#
# helpers for methods
#
helpers do 
    # lookup for id
    def mongo_id val
        BSON::ObjectId.from_string(val)
    end

    # find password from id
    def password_by_id id
        id = mongo_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        @password = parsed["password"]
    end

    # find username from id
    def username_by_id id
        id = mongo_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        return parsed["username"].to_s
    end

    # find friends from id
    def friends_by_id id
        id = mongo_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        
        
        friends = parsed["friends"]
        if friends.nil?
            return nil.to_a.to_json
        else
            return friends.to_json
        end
    end

    # find history msg from history_id
    def history_by_id id
        @history_obj = settings.mongo_db['dialog'].find_one(:did => id).to_json
        #p "`````#{@history_obj.to_s}`````"
        if @history_obj.to_s == "null"
            return nil.to_a.to_json
        else
            his_parsed = JSON.parse(@history_obj)
            ch_log = his_parsed["dialog"]
            return ch_log.to_json
        end
    end



    # check username exists ?
    def check_username (name,pwd)
        @lookup_result = settings.mongo_db['accounts'].find_one(:username => name).to_json
        if @lookup_result.to_s == "null"
            session.clear
            haml :notfound
        else
           parsed = JSON.parse(@lookup_result)
  	   @password_l = parsed["password"]
           @session_id = parsed["_id"]["$oid"]
           if @password_l.eql?(pwd)
               # need to make a ticket sender server
 	       #"show password: #{@password_l}" 
               session[:id] = @session_id
               redirect 'friends'
               #"#{parsed["_id"]["$oid"]}"
           else
               # need to make a simeple error redirect page
               session.clear
               redirect 'hello'
           end
        end
    end
end
#
# action to direct to client to boo !
#
get '/friends' do
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else 
        # MUST to design a random key to hash the session
        if session[:id].to_s.eql?(mongo_id(session[:id]).to_s) 
            # this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[:id])
            friends_json = friends_by_id(session[:id])
            haml :friends_list , :locals => {:user_name => "#{login_usr}",:friends_list => friends_json}
        else
            # this part need to some soliutions
            # 1: clean session(comparison)
            # 2: query DB info. again
            # 3: RANDOM KET SETTING
            #"====#{@session_id}==="
            #session[:id]
            "You are not permissioned to login!"
        end
    end
end
#
# client for Boo-it chating!
#
post '/chat' do
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else
        if session[:id].to_s.eql?(mongo_id(session[:id]).to_s)
            # this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[:id])
            # history send!
            historyid = []
            historyid.push(login_usr.to_s)
            historyid.push(params[:chat_f].to_s)
            sort_his_id = historyid.sort
            q_history_id = sort_his_id[0].to_s + sort_his_id[1].to_s
            history_json = history_by_id(q_history_id)
            haml :chat , :locals => {:user_name => "#{login_usr}",:friend_name => params[:chat_f],:history_msg => history_json}
        else
            "You are not permissioned to login!"
        end
    end
end
#
# if use incorrect http request to client
#
get '/test_client' do
    session.clear
    redirect 'hello'
end
#
# redirect page
#
get '/redirect' do
    haml :redirect
end
#
# logout and clean the session
#
get '/logout' do
    session.clear
    redirect 'hello'
end
#
# action to lookup database
#
get '/documents/?' do 
    content_type :json
    #settings.mongo_db['accounts'].find.to_a.to_json
    settings.mongo_db['dialog'].find.to_a.to_json
end
#
# action to lookup by id
#
get '/documents/:id' do
    content_type :json
    password_by_id(params[:id])
end
#
# show index
#
get '/hello' do
    haml :hello
end
#
# login
#
post '/login' do
    @username = params[:username]
    @password = params[:password]
    
    check_username(params[:username],params[:password])
    #erb :result
end
#
# if Page NOT FOUND
#
# 404 Error!
not_found do
    status 404
    haml :page_404
end
#
# mongoDB test
#
get '/collections/?' do
    content_type :json
    settings.mongo_db.collection_names.to_json
end
#
# friends_test
#
get '/test' do
    if session[:tmp] == nil
        "nil"
    else
        haml :test , :locals =>{:tmp => "123"}
    end
end

