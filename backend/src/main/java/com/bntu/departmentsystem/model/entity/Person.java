package com.bntu.departmentsystem.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@MappedSuperclass
public class Person {
    @Column(nullable = false, name = "last_name")
    @Length(max = 20)
    private String lastName;

    @Column(nullable = false, name = "first_name")
    @Length(max = 20)
    private String firstName;

    @Column(name = "middle_name")
    @Length(max = 20)
    private String middleName;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Length(max = 20)
    private String phone;

    @Length(max = 50)
    private String email;

    @Column(nullable = false, name = "full_name")
    @Length(max = 65)
    private String fullName;

    @Column(nullable = false, name = "abbreviated_name")
    @Length(max = 30)
    private String abbreviatedName;
}
