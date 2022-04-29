package com.test;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationTest {

    @Test // this test will fail if you do not have a password in the application.properties
    void contextLoads(){}
}
