require 'em-websocket'

puts "Server is listening!..."
EM.run {
  EM::WebSocket.run(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen { |handshake|
      puts "WebSocket connection open"
      # path, query_string, origin, headers

      # Publish message to the client

      #ws.send "Hello Client, you connected to #{handshake.path}"
    }

    ws.onclose { puts "Connection closed" }
    #puts ws.onmessage.methods.sort
    ws.onmessage { |msg|
      puts "Recieved message: #{msg}"
      ws.send "s: #{msg} ."
      ws.send "s: Hello , welcome to Line_J"
    }
  end
}
