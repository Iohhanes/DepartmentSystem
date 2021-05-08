package com.bntu.departmentsystem.utils.exception;

public class InvalidUploadFileException extends Exception {
    public InvalidUploadFileException() {
        super();
    }

    public InvalidUploadFileException(String message) {
        super(message);
    }

    public InvalidUploadFileException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidUploadFileException(Throwable cause) {
        super(cause);
    }
}
