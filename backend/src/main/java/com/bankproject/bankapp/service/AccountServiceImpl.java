package com.bankproject.bankapp.service;

import com.bankproject.bankapp.entity.Account;
import com.bankproject.bankapp.exception.AccountNotFoundException;
import com.bankproject.bankapp.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class AccountServiceImpl {

    AccountRepository accountRepository;

    public  Account getAccount(Long id) {
        Optional<Account> account = accountRepository.findById(id);
        return unwrapAccount(account, id);
    }

    public  Account saveAccount(Account account) { return accountRepository.save(account); }

    public void deleteAccount(Long id) { accountRepository.deleteById(id); }

    public List<Account> getAccounts() { return (List<Account>)accountRepository.findAll(); }

    static Account unwrapAccount(Optional<Account> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new AccountNotFoundException(id);
    }
}
