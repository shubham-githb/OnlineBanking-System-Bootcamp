package com.bankproject.bankapp.service;

import com.bankproject.bankapp.entity.Customer;
import com.bankproject.bankapp.exception.CustomerNotFoundException;
import com.bankproject.bankapp.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

    CustomerRepository customerRepository;

    public Customer getCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return unwrapCustomer(customer, id);
    }

    public Customer saveCustomer(Customer customer) { return customerRepository.save(customer); }

    public void deleteCustomer(Long id) { customerRepository.deleteById(id); }
    
    public List<Customer> getCustomers() { return (List<Customer>)customerRepository.findAll(); }

    static Customer unwrapCustomer(Optional<Customer> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new CustomerNotFoundException(id);
    }
}
