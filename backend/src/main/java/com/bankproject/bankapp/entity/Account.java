package com.bankproject.bankapp.entity;

import javax.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.*;

@Data
@RequiredArgsConstructor
@Entity
@Table(name="Account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(nullable = false, unique = true)
    private Long accountNumber;

    @Column(nullable = false)
    private String accountType;

    @Column(nullable = false)
    private double accountBalance;

    @Column(nullable = false)
    private Date openDate;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    private List<Transaction> transactions;
}
