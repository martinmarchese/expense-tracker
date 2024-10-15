package com.mm.expense_tracker_api.repository;

import com.mm.expense_tracker_api.domain.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovementRepository extends JpaRepository<Movement,Long> {
    List<Movement> findByCategoryId(Long categoryId);

}
