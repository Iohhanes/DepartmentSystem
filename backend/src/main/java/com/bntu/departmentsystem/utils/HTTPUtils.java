package com.bntu.departmentsystem.utils;

import com.bntu.departmentsystem.model.MimeType;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayOutputStream;

import static com.bntu.departmentsystem.constants.HTTPConstants.CONTENT_DISPOSITION;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HTTPUtils {

    public static ResponseEntity<byte[]> formResponseWithFile(ByteArrayOutputStream outputStream, String fileName) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, CONTENT_DISPOSITION + fileName);
        headers.add(HttpHeaders.CONTENT_TYPE, MimeType.getMimeTypeByFileName(fileName));
        return outputStream == null ? ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build() :
                ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
    }
}
