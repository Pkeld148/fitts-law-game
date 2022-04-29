package com.test.services;

import com.test.entity.Customer;
import com.test.repository.CustomerRepository;
import com.test.util.MockData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class CustomerServiceImplTest {

    @InjectMocks
    CustomerServiceImpl svc;

    @Mock
    CustomerRepository repo;

    private String resultString = "Successfully updated customer";
    private String deleteString = "Successfully deleted customer 1";

    @Test
    @DisplayName(value = "Get All Customers")
    void getAllCustomers(){
        Iterable<Customer> customers = MockData.getAllCustomers();
        when(repo.findAll()).thenReturn(customers);
        Iterable<Customer> result = svc.getAllCustomers();
        verify(repo).findAll();
        assertEquals(result, customers);
    }

    @Test
    @DisplayName(value = "Get a Customer")
    void getCustomerById(){
        Customer customer = MockData.getCustomer();
        when(repo.findById(anyInt())).thenReturn(Optional.of(customer));
        Customer result = svc.getCustomerById(1);
        verify(repo).findById(1);
        assertEquals(result, customer);
    }

    @Test
    @DisplayName(value = "Get a Customer BAD")
    void getCustomerByIdFail(){
        Customer customer = MockData.getCustomer();
        when(repo.findById(anyInt())).thenReturn(Optional.empty());
        Customer result = svc.getCustomerById(1);
        verify(repo).findById(1);
        assertEquals(result, null);
    }

    @Test
    @DisplayName(value = "Add Customer")
    void addCustomer(){
        Customer customer = MockData.getCustomer();
        when(repo.save(any())).thenReturn(customer);
        Customer result = svc.addCustomer(customer);
        verify(repo).save(customer);
        assertEquals(result, customer);
    }

    @Test
    @DisplayName(value = "Update Customer")
    void updateCustomer(){
        Customer customer = MockData.getCustomer();
        when(repo.save(any())).thenReturn(customer);
        String result = svc.updateCustomer(1, customer);
        verify(repo).save(customer);
        assertEquals(result, resultString);
    }

    @Test
    @DisplayName(value = "Update Customer Failure")
    void updateCustomerFail(){
        Customer customer = MockData.getCustomer();
        when(repo.save(any())).thenReturn(new Exception());
        String result = svc.updateCustomer(1, customer);
        verify(repo).save(customer);
        assertNotNull(result);
    }

    @Test
    @DisplayName(value = "Delete Customer")
    void removeCustomer(){
        String result = svc.removeCustomer(1);
        verify(repo).deleteById(1);
        assertEquals(result, deleteString);
    }


}
