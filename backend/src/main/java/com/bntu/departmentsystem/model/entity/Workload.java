package com.bntu.departmentsystem.model.entity;

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

    private Integer hours;

    private Integer support;

    private Integer hourly;

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
