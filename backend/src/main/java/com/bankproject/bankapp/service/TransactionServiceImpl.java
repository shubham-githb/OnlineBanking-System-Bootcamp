package com.bankproject.bankapp.service;

import com.bankproject.bankapp.entity.Transaction;
import com.bankproject.bankapp.exception.TransactionNotFoundException;
import com.bankproject.bankapp.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {
    TransactionRepository transactionRepository;

    public Transaction getTransaction(Long id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        return unwrapTransaction(transaction, id);
    }

    public Transaction saveTransaction(Transaction transaction) { return transactionRepository.save(transaction); }

    public void deleteTransaction(Long id) { transactionRepository.deleteById(id); }

    public List<Transaction> getTransactions() { return (List<Transaction>)transactionRepository.findAll(); }

    static Transaction unwrapTransaction(Optional<Transaction> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new TransactionNotFoundException(id);
    }
}
