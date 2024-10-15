package com.mm.expense_tracker_api.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movement")
@Builder
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class Movement {
    @Id
    @GeneratedValue
    private Long id;

    private MovementType type;

    @ManyToOne
    private MovementCategory category;

    private Long amount;

    private Boolean isCC;

    private String comments;
}
