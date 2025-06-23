package com.mm.expense_tracker.controller;

import com.mm.expense_tracker.model.Movement;
import com.mm.expense_tracker.repository.MovementRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Date;
import java.time.LocalDate;

@Controller
@RequestMapping("/movement")
public class MovementController {

    // 1. Use final and constructor injection (modern best practice over @Autowired)
    private final MovementRepository movementRepository;

    public MovementController(MovementRepository movementRepository) {
        this.movementRepository = movementRepository;
    }

    // 2. Map the list view to "/all" as requested
    @GetMapping("/all")
    public String showMovementList(Model model) {
        model.addAttribute("movements", movementRepository.findAll());
        return "index"; // Renders index.html
    }

    @GetMapping("/add")
    public String showMovementsForm(Model model) { // Changed signature for clarity
        // 3. It's clearer to explicitly add the new object to the model.
        model.addAttribute("movement", new Movement());
        return "add-movement";
    }

    @PostMapping("/add")
    public String addMovement(Movement movement, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-movement";
        }
        movement.setDate(Date.valueOf(LocalDate.now()));
        movementRepository.save(movement);
        // 4. CRITICAL FIX: Redirect to the correct, absolute path.
        return "redirect:/movement/all";
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
        // 4. CRITICAL FIX: Redirect to the correct, absolute path.
        return "redirect:/movement/all";
    }

    @GetMapping("/delete/{id}")
    public String deleteMovement(@PathVariable("id") long id, Model model) {
        Movement movement = movementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid movement Id:" + id));
        movementRepository.delete(movement);
        // 4. CRITICAL FIX: Redirect to the correct, absolute path.
        return "redirect:/movement/all";
    }
}