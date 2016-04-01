    
// lookup for id
function mongo_id(val){    
    // BSON::ObjectId.from_string(val)
}

// find password from id
function password_by_id(id){
    /*
    id = mongo_id(id) if String === id
        @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
    parsed = JSON.parse(@obj)
    @password = parsed["password"]
    */
}

// find username from id
function username_by_id(id){
 /*
        id = mongo_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        return parsed["username"].to_s
*/
}

// find friends from id
function friends_by_id(id){
        /*
        id = mongo_id(id) if String === id
            @obj = settings.mongo_db['accounts'].find_one(:_id => id).to_json
        parsed = JSON.parse(@obj)
        
        friends = parsed['friends']
        
        if(friends == undefined)
            return nil.to_a.to_json
        else
            return friends.to_json
        */
}

// find history msg from history_id
function history_by_id(id){
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
}

//   check username exists 
function check_username(name, pwd){
    /*
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
    */
}