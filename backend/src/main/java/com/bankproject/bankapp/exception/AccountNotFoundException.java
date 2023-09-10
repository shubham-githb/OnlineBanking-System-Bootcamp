package com.bankproject.bankapp.exception;

public class AccountNotFoundException extends RuntimeException{
    public AccountNotFoundException(Long id) {super("The account id '" + id + "' does not exist in our records." );}
}
