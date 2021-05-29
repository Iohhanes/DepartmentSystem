package com.bntu.departmentsystem.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileNameUtils {

    public static String getExtensionByFileName(String fileName) {
        String fileNameExtension = null;
        int index = fileName.lastIndexOf(".");
        if (index > 0) {
            fileNameExtension = fileName.substring(index);
        }
        return fileNameExtension;
    }
}
