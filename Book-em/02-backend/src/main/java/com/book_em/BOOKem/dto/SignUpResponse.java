package com.book_em.BOOKem.dto;

public class SignUpResponse {
    private String message;

    public SignUpResponse(String message) {
        this.message = message;
    }

    // Getter
    public String getMessage() {
        return message;
    }

    // Setter
    public void setMessage(String message) {
        this.message = message;
    }
}