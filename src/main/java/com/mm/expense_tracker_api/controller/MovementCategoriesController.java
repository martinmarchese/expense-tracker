package com.mm.expense_tracker_api.controller;

import com.mm.expense_tracker_api.domain.MovementCategory;
import com.mm.expense_tracker_api.repository.MovementCategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class MovementCategoriesController {
    private final MovementCategoryRepository movementCategoryRepository;

    public MovementCategoriesController(MovementCategoryRepository movementCategoryRepository) {
        this.movementCategoryRepository = movementCategoryRepository;
    }

    @GetMapping
    public List<MovementCategory> getMovementCategories() {
        return movementCategoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public MovementCategory getMovementCategory(@PathVariable Long id) {
        return movementCategoryRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createMovementCategory(@RequestBody MovementCategory movementCategory) throws URISyntaxException {
        MovementCategory savedMovementCategory = movementCategoryRepository.save(movementCategory);
        return ResponseEntity.created(new URI("/movementCategories/" + savedMovementCategory.getId())).body(savedMovementCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateMovementCategory(@PathVariable Long id, @RequestBody MovementCategory movementCategory) {
        MovementCategory currentMovementCategory = movementCategoryRepository.findById(id).orElseThrow(RuntimeException::new);
        currentMovementCategory.setName(movementCategory.getName());
        currentMovementCategory = movementCategoryRepository.save(movementCategory);

        return ResponseEntity.ok(currentMovementCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMovementCategory(@PathVariable Long id) {
        movementCategoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
