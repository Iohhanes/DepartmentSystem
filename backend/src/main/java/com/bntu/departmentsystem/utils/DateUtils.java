package com.bntu.departmentsystem.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DateUtils {
    private static final DateFormat DATE_FORMATTER = new SimpleDateFormat("dd/MM/yyyy");
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");


    public static LocalDate format(String dateString) {
        try {
            return LocalDate.parse(DATE_FORMATTER.format(DATE_FORMATTER.parse(dateString)),
                    DATE_TIME_FORMATTER);
        } catch (ParseException exception) {
            return LocalDate.now();
        }
    }
}
