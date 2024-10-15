package com.mm.expense_tracker_api.repository;

import com.mm.expense_tracker_api.domain.MovementCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovementCategoryRepository extends JpaRepository<MovementCategory,Long> {

}
