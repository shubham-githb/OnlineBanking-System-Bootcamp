package com.bankproject.bankapp.repository;

import com.bankproject.bankapp.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Customer, Long> {
}
