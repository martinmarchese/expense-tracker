package com.mm.expense_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "movements")
@AllArgsConstructor
@NoArgsConstructor
public class Movement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private Date date;

    @Getter
    @Setter
    private String type;

    @Getter
    @Setter
    private String category;

    @Getter
    @Setter
    private Long amount;

    @Getter
    @Setter
    private Boolean isCC;

    @Getter
    @Setter
    private String comments;
}
