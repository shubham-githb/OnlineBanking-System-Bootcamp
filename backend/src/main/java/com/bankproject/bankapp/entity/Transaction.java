package com.bankproject.bankapp.entity;

import javax.persistence.*;
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

    @Column
    private String date;

    @Column
    private double amount;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;
}

