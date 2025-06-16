package com.mm.expense_tracker;

import com.mm.expense_tracker.model.Movement;
import com.mm.expense_tracker.repository.MovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/movement")
public class MovementController {

    @Autowired
    MovementRepository movementRepository;

    @GetMapping("/index")
    public String showMovementList(Model model) {
        model.addAttribute("movements", movementRepository.findAll());
        return "index";
    }

    @PostMapping("/add")
    public String addMovement(Movement movement, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-movement";
        }

        movementRepository.save(movement);
        return "redirect:/index";
    }
}
