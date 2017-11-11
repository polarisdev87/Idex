package com.gs2.pipeline.controller;

import com.gs2.pipeline.exception.AccountNotFoundException;
import com.gs2.pipeline.exception.DuplicateUsernameException;
import com.gs2.pipeline.exception.IdeaNotFoundException;
import com.gs2.pipeline.exception.UnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ExceptionHandlers {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionHandlers.class);

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity<?> handleAccountNotFoundException(final AccountNotFoundException e) {

        return ResponseEntity
                .notFound()
                .build();
    }

    @ExceptionHandler(IdeaNotFoundException.class)
    public ResponseEntity<?> handleIdeaNotFoundException(final IdeaNotFoundException e) {

        return ResponseEntity
                .notFound()
                .build();
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> handleTimeUnauthorizedException(final UnauthorizedException e) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<?> handleTimeUnauthorizedException(final DuplicateUsernameException e) {

        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity handleInternalAuthException(final InternalAuthenticationServiceException e) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity handleBadCredentialsException(final BadCredentialsException e) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleMethodArgumentNotValidException(final MethodArgumentNotValidException e) {

        List<ObjectError> errors = e.getBindingResult().getAllErrors();
        StringBuilder sb = new StringBuilder();

        for(ObjectError error : errors) {
            sb.append(error.getDefaultMessage() + ". ");
        }

        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(sb.toString()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity handleMethodNotSupportedException(final HttpRequestMethodNotSupportedException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorMessage(e.getMessage()));
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity handleEmptyResultDataAccessException(final EmptyResultDataAccessException e) {
        return ResponseEntity
                .notFound()
                .build();
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity handleThrowable(final Throwable e) {

        logger.error("An unexpected error occurred:", e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage("An unexpected internal server error occurred"));
    }

    public class ErrorMessage {

        private String error;

        public ErrorMessage() {
        }

        public ErrorMessage(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }
    }
}
