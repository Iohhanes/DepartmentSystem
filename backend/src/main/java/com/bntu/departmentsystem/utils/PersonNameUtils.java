package com.bntu.departmentsystem.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PersonNameUtils {

    public static String getFullName(String lastName, String firstName, String middleName) {
        return lastName + " " +
                firstName +
                (middleName != null && !middleName.isEmpty() ? " " + middleName : "");
    }

    public static String getAbbreviatedName(String lastName, String firstName, String middleName) {
        return lastName + " " +
                firstName.charAt(0) + "." +
                (middleName != null && !middleName.isEmpty() ? middleName.charAt(0) + "." : "");
    }
}
