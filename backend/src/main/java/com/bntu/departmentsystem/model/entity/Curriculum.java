package com.bntu.departmentsystem.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "curriculums")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Curriculum {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "year_of_entry")
    private Integer yearOfEntry;

    @ManyToOne
    @JoinColumn(name = "speciality_id")
    private Speciality speciality;

    @OneToOne(mappedBy = "curriculum")
    private CurriculumContent curriculumContent;
}