package com.bntu.departmentsystem.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "curriculum_contents")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CurriculumContent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "exam_term_number")
    private Integer examTermNumber;

    @Column(name = "credit_term_number")
    private Integer creditTermNumber;

    @Column(name = "audit_hours")
    private Integer auditHours;

    @Column(name = "lecture_hours")
    private Integer lectureHours;

    @Column(name = "lab_work_hours")
    private Integer labWorkHours;

    @OneToOne
    @JoinColumn(nullable = false, name = "curriculum_id")
    private Curriculum curriculum;

    @ManyToOne
    @JoinColumn
    private Subject subject;
}
