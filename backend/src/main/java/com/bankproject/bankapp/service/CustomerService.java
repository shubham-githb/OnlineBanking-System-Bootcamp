package com.bankproject.bankapp.service;

import com.bankproject.bankapp.entity.Customer;

import java.util.List;

public interface CustomerService {
    Customer getCustomer(Long id);
    Customer saveCustomer(Customer customer);
    void deleteCustomer(Long id);
    List<Customer> getCustomers();
}
