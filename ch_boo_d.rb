require 'em-websocket'
require 'mongo'
require 'json'
include Mongo
#
# connecting to the database (for history)
#
client = MongoClient.new # defaults to localhost:27017
db     = client['Boo']
@coll   = db['dialog']
#
# chat server 
#
puts "Server is listening!..."
@uid = []
@sid = []
@channel_list = []

EM.run {
    @channel = EM::Channel.new
    #puts @channel.methods
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
    #puts ws.methods.sort
    #puts ws.onopen.methods.sort
    ws.onopen { |handshake|
      @first_login = 0
      #@channel = EM::Channel.new
      puts "WebSocket connection open"
      # first message to subscribe channel
      @sid << @channel.subscribe {|msg|
          #puts "XXX"
          puts "received:" + msg + "---"
          ws.send msg # send itself
          if @first_login >= 2
              # history record beginning
              puts "history record"
          else
              # nothing
              #puts "not mongoDB"
          end
          @first_login += 1
      }
      tid = @sid.last
      # broadcast each connection users
      @channel.push "#{@sid.last} connect!"
      ws.onmessage {|msg|
        @uid = msg.split(/,/)
	#ws.send "---" + @uid[0] + "---"
        # Here are tickets
	#if @uid[0] ==  "larry" && @uid[1] == "veck" && tid == 1
           #@channel.push "<#{tid}>: #{msg}"
          #if @first == 0
              @channel.push "#{msg}"
          #    @first += 1
          #else
              
          #end
           #puts @channel.subs.to_s
	#end
        #ws.send msg
      #puts @uid[0]
      }

      ws.onclose {
          @channel.unsubscribe(tid)
          #@channel.push "#{tid} conection closed!"
          puts "#{tid} conection closed!"
      }
      
    }  # onopen end

    #ws.onclose { puts "Connection closed" }
    #puts ws.onmessage.methods.sort
    #ws.onmessage { |msg|
    #  puts "Recieved message: #{msg}"
    #  ws.send "s: #{msg} ."
      #ws.send "s: Hello , welcome to Line_J"
  end
}
