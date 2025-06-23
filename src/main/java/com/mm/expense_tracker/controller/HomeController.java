package com.mm.expense_tracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String redirectToMovementList() {
        // This redirects any request for the root URL "/"
        // to the main application view at "/movement/all".
        return "redirect:/movement/all";
    }
}