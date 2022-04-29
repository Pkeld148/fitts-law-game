package com.test.controller;

import com.test.entity.Customer;
import com.test.services.CustomerService;
import com.test.util.MockData;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class CustomerControllerTest {
    @InjectMocks
    private CustomerController customerController;

    @Mock
    private CustomerService customerService;

    private Customer newCustomer;
    private String resultString = "Successfully updated customer";
    private String deleteString = "Successfully deleted customer 1";

    @BeforeEach
    void setup(){
        newCustomer = MockData.getCustomer();
    }

    @Test
    @DisplayName(value = "Retrieving all Customers")
    void getAllCustomers(){
        Iterable<Customer> customers = MockData.getAllCustomers();
        when(customerService.getAllCustomers()).thenReturn(customers);

        ResponseEntity<Iterable<Customer>> response = customerController.getAllCustomers();
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(customers, response.getBody());
        verify(customerService).getAllCustomers();
    }

    @Test
    @DisplayName(value = "Retrieving a Customer")
    void getCustomerById(){
        Customer customer = MockData.getCustomer();
        when(customerService.getCustomerById(1)).thenReturn(customer);

        ResponseEntity<Customer> response = customerController.getCustomerById(1);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(customer, response.getBody());
        verify(customerService).getCustomerById(1);
    }

    @Test
    @DisplayName(value = "Adding a Customer")
    void addCustomer(){
        when(customerService.addCustomer(newCustomer)).thenReturn(newCustomer);

        ResponseEntity<Customer> response = customerController.addCustomer(newCustomer);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(newCustomer, response.getBody());
        verify(customerService).addCustomer(newCustomer);
    }

    @Test
    @DisplayName(value = "Update a Customer")
    void updateCustomer(){
        Customer customer = MockData.getCustomer();
        when(customerService.getCustomerById(1)).thenReturn(customer);
        ResponseEntity<Customer> response = customerController.getCustomerById(1);
        assertEquals(customer, response.getBody());

        // now update age to 25
        Customer customerUpdate = new Customer(1, "Test1", 25);
        when(customerService.updateCustomer(1, customerUpdate)).thenReturn(resultString);
        ResponseEntity<String> response1 = customerController.updateCustomer(1, customerUpdate);
        assertEquals(resultString, response1.getBody());
        assertEquals(response1.getStatusCode(), HttpStatus.OK);

        verify(customerService).getCustomerById(1);
        verify(customerService).updateCustomer(1, customerUpdate);
    }

    @Test
    @DisplayName(value = "Remove a Customer")
    void removeCustomer(){
        Customer customer = MockData.getCustomer();
        when(customerService.getCustomerById(1)).thenReturn(customer);
        ResponseEntity<Customer> response = customerController.getCustomerById(1);
        assertEquals(customer, response.getBody());

        // now update age to 25
        when(customerService.removeCustomer(1)).thenReturn(deleteString);
        ResponseEntity<String> response1 = customerController.removeCustomer(1);
        assertEquals(deleteString, response1.getBody());
        assertEquals(response1.getStatusCode(), HttpStatus.OK);

        verify(customerService).getCustomerById(1);
        verify(customerService).removeCustomer(1);
    }



}
