package com.mm.expense_tracker.repository;

import com.mm.expense_tracker.model.Movement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovementRepository extends CrudRepository<Movement, Long> {}