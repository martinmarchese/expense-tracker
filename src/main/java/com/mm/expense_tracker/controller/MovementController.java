package com.mm.expense_tracker.controller;

import com.mm.expense_tracker.model.Movement;
import com.mm.expense_tracker.repository.MovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.nio.file.AtomicMoveNotSupportedException;

@Controller
@RequestMapping("/movement")
public class MovementController {

    @Autowired
    MovementRepository movementRepository;

    @GetMapping("/")
    public String showMovementList(Model model) {
        model.addAttribute("movements", movementRepository.findAll());
        return "/index";
    }

    @GetMapping("/add")
    public String showMovementsForm(Movement movement) {
        return "add-movement";
    }

    @PostMapping("/add")
    public String addMovement(Movement movement, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-movement";
        }

        movementRepository.save(movement);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String showUpdateForm(@PathVariable("id") long id, Model model) {
        Movement movement = movementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid movement Id:" + id));

        model.addAttribute("movement", movement);
        return "update-movement";
    }

    @PostMapping("/update/{id}")
    public String updateMovement(@PathVariable("id") long id, Movement movement,
                             BindingResult result, Model model) {
        if (result.hasErrors()) {
            movement.setId(id);
            return "update-movement";
        }

        movementRepository.save(movement);
        return "redirect:/index";
    }

    @GetMapping("/delete/{id}")
    public String deleteMovement(@PathVariable("id") long id, Model model) {
        Movement movement = movementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid movement Id:" + id));
        movementRepository.delete(movement);
        return "redirect:/index";
    }

}
