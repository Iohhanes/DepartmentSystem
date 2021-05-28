package com.bntu.departmentsystem.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

@Entity
@Table(name = "subjects")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Length(max = 100)
    private String title;

    @Column(nullable = false, name = "content_exist", columnDefinition = "BIT", length = 1)
    private boolean contentExist;

    @Column(name = "content_name")
    @Length(max = 100)
    private String contentName;
}
