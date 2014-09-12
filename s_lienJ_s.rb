require 'em-websocket'
@sid
puts "Server is listening!..."
EM.run {
  @channel = EM::Channel.new
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen { |handshake|
      puts "WebSocket connection open"
      @sid = @channel.subscribe {|msg|
          puts "---" + msg + "---"
          ws.send msg # send itself
      }
      puts @sid.to_s + " connected!"
      # path, query_string, origin, headers
      # Publish message to the client
      #ws.send "Hello Client, you connected to #{handshake.path}"
    }
    

    ws.onclose { 
	puts @sid.to_s + "Connection closed" 
	@channel.unsubscribe(@sid)
    }
    #puts ws.onmessage.methods.sort
    ws.onmessage { |msg|
      puts "Recieved message: #{msg}"
      #ws.send "s: #{msg} ."
      @channel.push @sid.to_s + ":#{msg}"
      #ws.send "s: Hello , welcome to Line_J"
    }
  end
}
