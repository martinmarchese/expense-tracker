package com.mm.expense_tracker_api.controller;

import com.mm.expense_tracker_api.domain.Movement;
import com.mm.expense_tracker_api.domain.MovementType;
import com.mm.expense_tracker_api.repository.MovementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/movements")
public class MovementsController {

    private final MovementRepository movementRepository;

    public MovementsController(MovementRepository movementRepository) {
        this.movementRepository = movementRepository;
    }

    @GetMapping
    public List<Movement> getMovements() {
        return movementRepository.findAll();
    }

    @GetMapping("/{id}")
    public Movement getMovement(@PathVariable Long id) {
        return movementRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createMovement(@RequestBody Movement movement) throws URISyntaxException {
        Movement savedMovement = movementRepository.save(movement);
        return ResponseEntity.created(new URI("/movements/" + savedMovement.getId())).body(savedMovement);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateMovement(@PathVariable Long id, @RequestBody Movement movement) {
        Movement currentMovement = movementRepository.findById(id).orElseThrow(RuntimeException::new);
        currentMovement.setType(movement.getType());
        currentMovement.setCategory(movement.getCategory());
        currentMovement.setAmount(movement.getAmount());
        currentMovement.setIsCC(movement.getIsCC());
        currentMovement.setComments(movement.getComments());
        currentMovement = movementRepository.save(movement);

        return ResponseEntity.ok(currentMovement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMovement(@PathVariable Long id) {
        movementRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/movement-types")
    public MovementType[] getMovementTypes() {
        return MovementType.values(); // Returns all enum values
    }

    @GetMapping("/category/{id}")
    public List<Movement> getMovementsByCategoryId(@PathVariable Long id) {
        return movementRepository.findByCategoryId(id); // Ensure you have this method in your repository
    }

}