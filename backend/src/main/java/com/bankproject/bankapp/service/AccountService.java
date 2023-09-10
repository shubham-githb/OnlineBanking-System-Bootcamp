package com.bankproject.bankapp.service;

import com.bankproject.bankapp.entity.Account;

import java.util.List;

public interface AccountService {
    Account getAccount(Long id);
    Account saveAccount(Account account);
    void deleteAccount(Long id);
    List<Account> getAccounts();
}
