package com.pilotpirxie.party.config;

import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ValidationExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public void handleValidationExceptions(MethodArgumentNotValidException ex) {
        String warningMessage = "Validation failed: " + ex.getBindingResult();
        System.out.println(warningMessage);
    }

    @MessageExceptionHandler(MethodArgumentNotValidException.class)
    public void handleValidationExceptionsInWebSocket(MethodArgumentNotValidException ex) {
        String warningMessage = "Validation failed: " + ex.getBindingResult();
        System.out.println(warningMessage);
    }
}
