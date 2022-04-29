package com.test.util;

import com.test.entity.Customer;

import java.util.Arrays;

public class MockData {

    public static Iterable<Customer> getAllCustomers(){
        Customer customer1 = new Customer(1, "Test1", 10);
        Customer customer2 = new Customer(2, "Test2", 12);
        return Arrays.asList(customer1, customer2);
    }


    public static Customer getCustomer(){
        return new Customer(1, "Test1", 10);
    }

}
