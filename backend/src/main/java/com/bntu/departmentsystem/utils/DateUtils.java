package com.bntu.departmentsystem.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Slf4j
public class DateUtils {
    private static final DateFormat DATE_FORMATTER = new SimpleDateFormat("dd/MM/yyyy");
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static LocalDate format(Date date) {
        return LocalDate.parse(DATE_FORMATTER.format(date), DATE_TIME_FORMATTER);
    }

    public static String format(LocalDate date) {
        return date.format(DATE_TIME_FORMATTER);
    }

    public static Date format(String dateString) {
        try {
            return DATE_FORMATTER.parse(dateString);
        } catch (ParseException exception) {
            log.warn("Date parsing error: {}", exception.getMessage());
            return new Date();
        }
    }
}
