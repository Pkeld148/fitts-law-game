package com.test.services;

import com.test.entity.Customer;
import org.springframework.http.ResponseEntity;

public interface CustomerService {
    public Customer getCustomerById(int id);
    public Iterable<Customer> getAllCustomers();
    public Customer addCustomer(Customer customer);
    public String updateCustomer(int id, Customer customer);
    public String removeCustomer(int id);

//    public ResponseEntity<Boolean> removeCustomer(int id);
}
