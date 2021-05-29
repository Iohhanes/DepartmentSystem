package com.bntu.departmentsystem.service.storage;

import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;

public interface FileStoreService {
    boolean uploadFile(String fileName, MultipartFile file) throws InvalidUploadFileException;

    ByteArrayOutputStream findFile(String fileName);

    void deleteFile(String fileName);
}
