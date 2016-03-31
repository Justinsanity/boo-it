require 'em-websocket'
require 'mongo'
require 'json'
include Mongo
#
# connecting to the database (for history)
#
client = MongoClient.new # defaults to localhost:27017
db     = client['Boo']
@coll  = db['dialog']
#
# boo_log history method
#
def boo_log(logStr)
    _currentTime = Time.new.to_s
    _logAry = logStr.split(',')
    _sortAry = [_logAry[0].to_s,_logAry[1].to_s].sort
    _did = _sortAry[0].to_s + _sortAry[1].to_s
    if @coll.find("did" => _did).to_a.empty?
        # if not found , then insert
        _jsonObj_insert = {:did => _did,:dialog => [{:from => _logAry[0] , :to => _logAry[1] , :datetime => _currentTime , :log => _logAry[2]}]}
        @coll.insert(_jsonObj_insert)
    else
       # if found , then update
       @coll.update({:did => _did}, {:$push => {:dialog => {:from => _logAry[0] , :to => _logAry[1] , :datetime => _currentTime , :log => _logAry[2]}}},:upsert => true)
    end
end
#
# chat server 
#
puts "Server is listening!..."
@uid = []
@sid = []
@channel_list = []

EM.run {
    @channel = EM::Channel.new
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen { |handshake|
      puts "WebSocket connection open"
      # first message to subscribe channel
      @sid << @channel.subscribe {|msg| # "sid << channel" means appending result of channel to sid
          #puts "XXX"
          puts "received:" + msg + "---"
          ws.send msg # send itself
          puts "history record"
      }
      tid = @sid.last
      puts "#{@sid.last} connect!"
      ws.onmessage {|msg|
          @uid = msg.split(/,/)
          @channel.push "#{msg}"
          boo_log(msg.to_s)
      }

      ws.onclose {
          @channel.unsubscribe(tid)
          puts "#{tid} conection closed!"
      }
    }  # onopen end
  end
}
