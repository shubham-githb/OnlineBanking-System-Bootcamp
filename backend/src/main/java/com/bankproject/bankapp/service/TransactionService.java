package com.bankproject.bankapp.service;

import com.bankproject.bankapp.entity.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction getTransaction(Long id);
    Transaction saveTransaction(Transaction transaction);
    void deleteTransaction(Long id);
    List<Transaction> getTransactions();
}
