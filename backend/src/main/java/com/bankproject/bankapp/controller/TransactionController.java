package com.bankproject.bankapp.controller;

import com.bankproject.bankapp.entity.Transaction;
import com.bankproject.bankapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class TransactionController {
    @Autowired
    TransactionService TransactionService;

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable Long id) {
        return new ResponseEntity<>(TransactionService.getTransaction(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Transaction> saveTransaction(@RequestBody Transaction transaction) {
        return new ResponseEntity<>(TransactionService.saveTransaction(transaction), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTransaction(@PathVariable Long id) {
        TransactionService.deleteTransaction(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getTransactions() {
        return new ResponseEntity<>(TransactionService.getTransactions(), HttpStatus.OK);
    }
}
