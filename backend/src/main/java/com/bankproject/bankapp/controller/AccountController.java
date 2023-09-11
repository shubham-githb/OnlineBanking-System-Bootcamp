package com.bankproject.bankapp.controller;

import com.bankproject.bankapp.entity.Account;
import com.bankproject.bankapp.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    AccountService AccountService;

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable Long id) {
        return new ResponseEntity<>(AccountService.getAccount(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Account> saveAccount(@RequestBody Account account) {
        return new ResponseEntity<>(AccountService.saveAccount(account), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAccount(@PathVariable Long id) {
        AccountService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAccounts() {
        return new ResponseEntity<>(AccountService.getAccounts(), HttpStatus.OK);
    }
}
