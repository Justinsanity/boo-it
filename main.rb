require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json/ext'
require 'json'

include Mongo

configure do 
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

    def check_username (name,pwd)
        @lookup_result = settings.mongo_db['accounts'].find_one(:username => name).to_json
        if @lookup_result.to_s == "null"
            "NOT FOUND ACCOUNT!"
        else
           parsed = JSON.parse(@lookup_result)
  	   @password_l = parsed["password"]
           if @password_l.eql?(pwd)
 	       "show password: #{@password_l}" 
           else
               # need to make a simeple error redirect page
               redirect to('/hello') 
           end
        end
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

