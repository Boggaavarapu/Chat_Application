package com.example.WebDemo.Config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import com.example.WebDemo.ModelController.ControllerClass;
@Configuration
@EnableWebSocket
public class Config implements WebSocketConfigurer {
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		System.out.println("11");
		registry.addHandler(new ControllerClass(), "/chat")
        .setAllowedOrigins("*");
	}

}
