package com.bntu.departmentsystem.utils;

import com.bntu.departmentsystem.model.dto.person.EditPersonRequest;
import com.bntu.departmentsystem.model.entity.Person;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PersonDataUtils {

    public static void editPerson(Person person, EditPersonRequest personRequest) {
        Optional.ofNullable(personRequest.getLastName()).ifPresent(person::setLastName);
        Optional.ofNullable(personRequest.getFirstName()).ifPresent(person::setFirstName);
        Optional.ofNullable(personRequest.getMiddleName()).ifPresent(person::setMiddleName);
        Optional.ofNullable(personRequest.getBirthDate()).ifPresent(birthDate -> person
                .setBirthDate(DateUtils.format(personRequest.getBirthDate())));
        Optional.ofNullable(personRequest.getPhone()).ifPresent(person::setPhone);
        Optional.ofNullable(personRequest.getEmail()).ifPresent(person::setEmail);
        if (personRequest.getLastName() != null && personRequest.getFirstName() != null) {
            person.setFullName(PersonNameUtils.getFullName(personRequest.getLastName(),
                    personRequest.getFirstName(),
                    personRequest.getMiddleName()));
            person.setAbbreviatedName(PersonNameUtils.getAbbreviatedName(personRequest.getLastName(),
                    personRequest.getFirstName(),
                    personRequest.getMiddleName()));
        }
    }
}
