package com.mm.expense_tracker_api.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "movement_category")
@Builder
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class MovementCategory {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
}
