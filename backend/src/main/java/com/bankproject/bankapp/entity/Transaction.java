package com.bankproject.bankapp.entity;

import javax.persistence.*;
import lombok.*;

import java.sql.Timestamp;


@Data
@RequiredArgsConstructor
@Entity
@Table(name="Transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @Column(nullable = false)
    private String transactionType;

    @Column(nullable = false)
    private double transactionAmount;

    @Column(nullable = false)
    private Timestamp timestamp;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;
}

