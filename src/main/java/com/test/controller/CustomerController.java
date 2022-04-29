package com.test.controller;

import com.test.entity.Customer;
import com.test.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

// Customer class (instructor copy)

@RestController
@RequestMapping(path = "/customers")
@CrossOrigin(origins = "http://localhost:3000")

public class CustomerController {
    @Autowired
    CustomerService customerService;

    @GetMapping("")
    public ResponseEntity<Iterable<Customer>> getAllCustomers() {
        return new ResponseEntity<Iterable<Customer>>(customerService.getAllCustomers(), HttpStatus.OK);
    }

    // Specific to get Mapping
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        return new ResponseEntity<Customer>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    // Specific to Post Mapping
    @PostMapping("")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        return new ResponseEntity<Customer>(customerService.addCustomer(customer), HttpStatus.OK);
    }

    // Specific to Put Mapping
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        return new ResponseEntity<String>(customerService.updateCustomer(id, customer), HttpStatus.OK);
    }

    // Specific to Delete Mapping
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeCustomer(@PathVariable int id) {
        return new ResponseEntity<String>(customerService.removeCustomer(id), HttpStatus.OK);
    }

//    // Specific to Delete Mapping
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Boolean> removeCustomer(@PathVariable int id) {
//        return customerService.removeCustomer(id);
//    }
}
