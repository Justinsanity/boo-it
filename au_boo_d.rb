require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext'
require 'json'

include Mongo

configure do 
    enable :sessions

    # this place must implement a random secret key generation
    set :session_secret, 'booit' 
    conn = MongoClient.new("localhost",27017)
    set :mongo_connection, conn
    set :mongo_db, conn.db('Boo')
end

get '/collections/?' do 
    content_type :json
    settings.mongo_db.collection_names.to_json
end

helpers do 

    def object_id val
        BSON::ObjectId.from_string(val)
    end


    def document_by_id id
        id = object_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        @password = parsed["password"]
        #"show password: #{@password} -----"
    end

    def username_by_id id
        id = object_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        return parsed["username"].to_s

    end


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
# action to direct to client to boo !
get '/client' do
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else 
        # MUST to design a random key to hash the session
        if session[:id].to_s.eql?(object_id(session[:id]).to_s) 
            # this part needs a algorithm to send ticket mechanism           
            login_usr = username_by_id(session[:id])
            erb :client , :locals => {:user_name => "#{login_usr}"}
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

get '/friends' do
    if session[:id] == nil
        session.clear
        redirect 'hello'
    else

    end
 
end
# action to lookup database
get '/documents/?' do 
    content_type :json
    settings.mongo_db['accounts'].find.to_a.to_json
end

# action to lookup by id
get '/documents/:id' do
    content_type :json
    document_by_id(params[:id])
end


get '/hello' do
    erb :index
end

post '/login' do
    @username = params[:username]
    @password = params[:password]
    
    check_username(params[:username],params[:password])
    
    #erb :result
end

