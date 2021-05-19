package com.bntu.departmentsystem.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "workloads")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Workload {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, precision = 2, scale = 1)
    private Double rate;

    private Integer support;

    private Integer hourly;

    @JsonIgnore
    @OneToOne
    @JoinColumn(nullable = false, name = "faculty_member_id")
    private FacultyMember facultyMember;

    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;

    @ManyToOne
    @JoinColumn(name = "position_pt_id")
    private Position positionPT;
}
