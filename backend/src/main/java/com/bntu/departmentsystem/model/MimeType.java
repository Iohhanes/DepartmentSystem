package com.bntu.departmentsystem.model;

import com.bntu.departmentsystem.utils.FileNameUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MimeType {

    XLSX(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    XLS(".xls", "application/vnd.ms-excel"),
    DOCX(".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
    DOC(".doc", "application/msword"),
    PDF(".pdf", "application/pdf");

    private final String extension;
    private final String value;

    public static String getMimeTypeByFileName(String fileName) {
        String fileNameExtension = FileNameUtils.getExtensionByFileName(fileName);
        return fileNameExtension == null ? null :
                Arrays.stream(MimeType.values())
                        .filter(mimeType -> mimeType.extension.equals(fileNameExtension))
                        .map(MimeType::getValue)
                        .findFirst()
                        .orElse(null);
    }
}
