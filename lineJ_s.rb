require 'em-websocket'

puts "Server is listening!..."
EM.run {
    @channel = EM::Channel.new
    #puts @channel.class
    #puts @channel.methods.sort
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|

    #puts ws.methods.sort

    #puts ws.onopen.methods.sort
    ws.onopen { |handshake|
      puts "WebSocket connection open"
      #puts "[" + handshake.path + "]"
      #puts handshake.query
      #puts handshake.origin
      #puts handshake.methods.sort
      sid = @channel.subscribe {|msg|
          
          ws.send msg # send itself
      }
      puts sid
      # broadcast each connection users
      @channel.push "#{sid} connect!"

      ws.onmessage {|msg|
          @channel.push "<#{sid}>: #{msg}"
          
      }

      ws.onclose {
          @channel.unsubscribe(sid)
      }
      

      # Access properties on the EM::WebSocket::Handshake object, e.g.
      # path, query_string, origin, headers

      # Publish message to the client

      #ws.send "Hello Client, you connected to #{handshake.path}"
    }

    #ws.onclose { puts "Connection closed" }
    #puts ws.onmessage.methods.sort
    #ws.onmessage { |msg|
    #  puts "Recieved message: #{msg}"
    #  ws.send "s: #{msg} ."
      #ws.send "s: Hello , welcome to Line_J"
    #}
  end
}
