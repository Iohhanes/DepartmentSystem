package com.bntu.departmentsystem.utils;

import com.bntu.departmentsystem.model.MimeType;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileNameUtils {

    public static String getExtensionByFileName(String fileName) {
        if (fileName != null) {
            String fileNameExtension = null;
            int index = fileName.lastIndexOf(".");
            if (index > 0) {
                fileNameExtension = fileName.substring(index);
            }
            return fileNameExtension;
        } else {
            return MimeType.DOCX.getExtension();
        }
    }
}
