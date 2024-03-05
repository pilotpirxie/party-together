package com.pilotpirxie.party.config;

import org.springframework.messaging.Message;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

public class WebSocketErrorHandler extends StompSubProtocolErrorHandler {
    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]> clientMessage, Throwable ex) {
        System.out.println("Error handling message: " + ex.getMessage());
        return super.handleClientMessageProcessingError(clientMessage, ex);
    }

    @Override
    public Message<byte[]> handleErrorMessageToClient(Message<byte[]> errorMessage) {
        System.out.println("Error handling message to client: " + errorMessage);
        return super.handleErrorMessageToClient(errorMessage);
    }
}
