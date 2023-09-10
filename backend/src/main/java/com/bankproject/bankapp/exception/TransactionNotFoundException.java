package com.bankproject.bankapp.exception;

public class TransactionNotFoundException extends RuntimeException{
    public TransactionNotFoundException(Long id) {super("The transaction id '" + id + "' does not exist in our records." );}
}
