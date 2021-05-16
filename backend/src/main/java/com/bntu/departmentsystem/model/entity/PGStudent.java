package com.bntu.departmentsystem.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pg_students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class PGStudent extends Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Length(max = 500)
    private String comment;

    @Column(nullable = false, name = "master", columnDefinition = "BIT", length = 1)
    private boolean master;

    @ManyToOne
    @JoinColumn(name = "faculty_member_id")
    private FacultyMember facultyMember;
}
