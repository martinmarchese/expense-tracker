package com.mm.expense_tracker.utils;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PwdGenerator implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;

    public PwdGenerator(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        /* --- TEMPORARY CODE TO GENERATE ENCODED PASSWORD ---
        String rawPassword = "initialPassword"; // <-- CHOOSE YOUR DESIRED PASSWORD HERE
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("====================================================================");
        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Password for DB: " + encodedPassword);
        System.out.println("====================================================================");
         --- END OF TEMPORARY CODE --- */
    }
}
    