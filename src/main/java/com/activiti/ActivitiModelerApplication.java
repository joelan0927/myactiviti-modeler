package com.activiti;

import org.activiti.spring.boot.SecurityAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude=SecurityAutoConfiguration.class)
public class ActivitiModelerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActivitiModelerApplication.class, args);
	}

}
