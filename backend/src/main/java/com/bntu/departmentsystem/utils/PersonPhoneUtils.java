package com.bntu.departmentsystem.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PersonPhoneUtils {
    private static final String PHONE_BELARUS_PREFIX = "+375";
    private static final int PHONE_CODE_LENGTH = 2;
    private static final int PHONE_LENGTH = 9;

    public static String format(String phone) {
        return phone == null ? null :
                PHONE_BELARUS_PREFIX + "(" + phone.substring(0, PHONE_CODE_LENGTH) + ")" +
                        phone.substring(PHONE_CODE_LENGTH, PHONE_LENGTH);
    }
}
