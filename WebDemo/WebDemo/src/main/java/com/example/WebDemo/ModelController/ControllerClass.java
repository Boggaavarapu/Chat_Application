package com.example.WebDemo.ModelController;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
public class ControllerClass extends TextWebSocketHandler {

	ObjectMapper objectMapper = new ObjectMapper();
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();
    private HashMap<String,WebSocketSession> map=new HashMap<String,WebSocketSession>();
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        webSocketSessions.add(session);
        InetSocketAddress sender =  session.getRemoteAddress();
        System.out.println(sender);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session,  TextMessage message) throws Exception {
    	String payload = message.getPayload();
    	payload=payload.substring(1, payload.length()-1);
    	String[] arr=payload.split(",");
    	String username=arr[0].split(":")[1];
    	String sender=arr[2].split(":")[1];
    	if (sender.substring(1,sender.length()-1).equals("server")) {
    		map.put(username,session);
    	}
    	else {
    		if (sender.substring(1,sender.length()-1).equals("Group")) {
        		for(WebSocketSession webSocketSession : webSocketSessions){
                	if (webSocketSession!=session) {
                		webSocketSession.sendMessage(message);
                	}
                    
                }
        	}
        	else {
        		WebSocketSession session1;
        		if (map.containsKey(sender)) {
        			session1=map.get(sender);
            		session1.sendMessage(message);
        		}
        		
        	}
    	}    	
    	
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        webSocketSessions.remove(session);
        System.out.println("1");
        session.sendMessage(new TextMessage("404"));
    }
}
