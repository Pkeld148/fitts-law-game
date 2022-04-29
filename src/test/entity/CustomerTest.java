package com.test.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class CustomerTest {

    private Customer customer = new Customer();
    private int id;
    private String name;
    private int age;

    @BeforeEach
    void setup(){
        id = 1;
        name = "test";
        age = 22;
    }

    @Test
    void testGetId(){
        customer.setId(id);
        Assertions.assertEquals(id, customer.getId());
    }

    @Test
    void testGetName(){
        customer.setName(name);
        Assertions.assertEquals(name, customer.getName());
    }

    @Test
    void testGetAge(){
        customer.setAge(age);
        Assertions.assertEquals(age, customer.getAge());
    }


}
