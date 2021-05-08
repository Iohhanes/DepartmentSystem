package com.bntu.departmentsystem.model.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name = "degrees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class Degree extends ProgressInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
}
