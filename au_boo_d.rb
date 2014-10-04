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
    def object_id val
        BSON::ObjectId.from_string(val)
    end

    # find password from id
    def password_by_id id
        id = object_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        @password = parsed["password"]
    end

    # find username from id
    def username_by_id id
        id = object_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        return parsed["username"].to_s
    end

    # find friends from id
    def friends_by_id id
        id = object_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        
        
        friends = parsed["friends"]
        if friends.nil?
            return nil.to_a.to_json
        else
            return friends.to_json
        end
        #"#{friends.}"
    end


    # check username exists ?
    def check_username (name,pwd)
        @lookup_result = settings.mongo_db['accounts'].find_one(:username => name).to_json
        if @lookup_result.to_s == "null"
            session.clear
            "NOT FOUND ACCOUNT!"
        else
           parsed = JSON.parse(@lookup_result)
  	   @password_l = parsed["password"]
           @session_id = parsed["_id"]["$oid"]
           if @password_l.eql?(pwd)
               # need to make a ticket sender server
 	       #"show password: #{@password_l}" 
               session[:id] = @session_id
               redirect 'client'
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
get '/client' do
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else 
        # MUST to design a random key to hash the session
        if session[:id].to_s.eql?(object_id(session[:id]).to_s) 
            # this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[:id])
            friends_json = friends_by_id(session[:id])
            #erb :client , :locals => {:user_name => "#{login_usr}",:friends_list => friends_json}
            haml :test , :locals => {:user_name => "#{login_usr}",:friends_list => friends_json}
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
    #erb :client
end
#
# test_client
#
post '/test_client' do
    #"hello #{params[:chat_f]}"
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else
        # MUST to design a random key to hash the session
        if session[:id].to_s.eql?(object_id(session[:id]).to_s)
            # this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[:id])
            #"hello #{params[:chat_f]}"
            haml :friends_ch , :locals => {:user_name => "#{login_usr}",:friend_name => params[:chat_f]}
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
# friends list route for TEST!!!!!
#
get '/friends' do
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else
        if URI(request.referrer || '').path == '/redirect'
            # find friends logic
            if session[:id].to_s.eql?(object_id(session[:id]).to_s)
                friends_json = friends_by_id(session[:id])

                # here must sent to client as friends list /views
                "#{friends_json}"
            else
                "Not permissioned!"
            end
        else 
            # from somewhere i don't know , so clean the session.
            session.clear
            redirect  'hello'
        end
    end
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
    settings.mongo_db['accounts'].find.to_a.to_json
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
    erb :index
end
#
# login test
#
post '/login' do
    @username = params[:username]
    @password = params[:password]
    
    check_username(params[:username],params[:password])
    #erb :result
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

get '/test_s' do
    session[:tmp] = "session_456"
end

get '/test_l' do 
    session.clear
    "session clear!"
end

#post '/test_client' do
#    "hello #{params[:chat_f]}"
#end
