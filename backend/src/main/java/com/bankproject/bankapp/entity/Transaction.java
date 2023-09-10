package com.bankproject.bankapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name="Transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;
}

