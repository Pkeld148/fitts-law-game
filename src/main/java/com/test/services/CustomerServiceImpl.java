package com.test.services;

import com.test.entity.Customer;
import com.test.repository.CustomerRepository;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public Iterable<Customer> getAllCustomers() {
        log.info("Getting all customers");
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(int id) {
        log.info("Get customers by id: {}", id);
        Optional<Customer> result = customerRepository.findById(id);
        return result.orElse(null);
    }

    @Override
    public Customer addCustomer(Customer customer) {
        log.info("Adding Customer");
        return customerRepository.save(customer);
    }

    @Override
    public String updateCustomer(int id, Customer customer) {
        customer.setId(id);
        log.info("Updating Customer");
        String result = "";
        try{
            customerRepository.save(customer);
            result = "Successfully updated customer";
        }catch(Exception e){
            result = "Caught exception " + e.getMessage();

        }
        return result;
    }

    @Override
    public String removeCustomer(int id) {
        log.info("Removing Customer: {}", id);
        String result = "";
        try{
            customerRepository.deleteById(id);
            result = "Successfully deleted customer " + id;
        }catch(Exception e){
            result = "Caught exception " + e.getMessage();
        }
        return result;
    }


//    public ResponseEntity<Boolean> removeCustomer(int id){
//        log.info("Removing Customer: {}", id);
//        try{
//            customerRepository.deleteById(id);
//            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
//        }catch(Exception e){
//            return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
//        }
//        return result;
//    }
}
