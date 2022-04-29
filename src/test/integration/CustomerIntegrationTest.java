package com.test.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.test.controller.CustomerController;
import com.test.entity.Customer;
import com.test.services.CustomerService;
import com.test.util.MockData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


// ENSURE YOU HAVE PUT YOUR PASSWORD IN APPLICATION.PROPERTIES for DB
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class CustomerIntegrationTest {
    @InjectMocks
    private CustomerController customerController;

    @Mock
    private CustomerService customerService;

    private MockMvc mvc;
    private String resultString = "Successfully updated customer";
    private String deleteString = "Successfully deleted customer 1";

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
        this.mvc = MockMvcBuilders.standaloneSetup(customerController).build();
    }

    @Test
    @DisplayName(value = "Retrieving a List of Customers integration")
    void getAllCustomers() throws Exception {
        when(customerService.getAllCustomers()).thenReturn(MockData.getAllCustomers());
        mvc.perform(get("/customers")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].age").value(10))
                .andExpect(jsonPath("$[1].name").value("Test2"))
                .andReturn();
        verify(customerService, times(1)).getAllCustomers();
    }

    @Test
    @DisplayName(value = "Retrieving a Customer integration")
    void getCustomerById() throws Exception {
        when(customerService.getCustomerById(1)).thenReturn(MockData.getCustomer());
        mvc.perform(get("/customers/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.age").value(10))
                .andExpect(jsonPath("$.name").value("Test1"))
                .andReturn();
        verify(customerService, times(1)).getCustomerById(1);
    }

    @Test
    @DisplayName(value = "Adding a Customer integration")
    void addCustomer() throws Exception {
        Customer newCustomer = MockData.getCustomer();
        when(customerService.addCustomer(newCustomer)).thenReturn(newCustomer);
        MvcResult result = mvc.perform(post("/customers")
                .content(asJsonString(newCustomer) )
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        assertNotNull(result.getResponse().getContentAsString());
        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
    }

    @Test
    @DisplayName(value = "Adding a Customer integration")
    void updateCustomer() throws Exception {
        Customer newCustomer = MockData.getCustomer();
        when(customerService.updateCustomer(1,newCustomer)).thenReturn(resultString);
        MvcResult result = mvc.perform(put("/customers/{id}", 1)
                .content(asJsonString(newCustomer) )
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        assertNotNull(result.getResponse().getContentAsString());
        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
    }

    @Test
    @DisplayName(value = "Removing a Customer integration")
    void removeCustomer() throws Exception {
        when(customerService.removeCustomer(1)).thenReturn(deleteString);
        MvcResult result = mvc.perform(delete("/customers/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        assertNotNull(result.getResponse().getContentAsString());
        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
