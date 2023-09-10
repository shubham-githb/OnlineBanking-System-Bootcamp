package com.bankproject.bankapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@Entity
@Table(name="Account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Transaction> transactions;
}
