package com.bntu.departmentsystem.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Log4j2
public class DateUtils {
    private static final DateFormat DATE_FORMATTER = new SimpleDateFormat("dd/MM/yyyy");
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static LocalDate format(Date date) {
        return date == null ? null : LocalDate.parse(DATE_FORMATTER.format(date), DATE_TIME_FORMATTER);
    }

    public static String format(LocalDate date) {
        return date == null ? null : date.format(DATE_TIME_FORMATTER);
    }

    public static Date format(String dateString) {
        if (dateString != null) {
            try {
                return DATE_FORMATTER.parse(dateString);
            } catch (ParseException exception) {
                log.warn("Date parsing error: {}", exception.getMessage());
                return null;
            }
        }
        return null;
    }
}
