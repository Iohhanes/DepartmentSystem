package com.bntu.departmentsystem.service.impl.storage;

import com.bntu.departmentsystem.service.storage.FileStoreService;
import com.bntu.departmentsystem.utils.FileNameUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Log4j2
public class FileStoreServiceImpl implements FileStoreService {
    private static final String FILES_STORE_PATH_PROPERTY = "store.location";

    @Override
    public boolean uploadFile(String fileName, MultipartFile file) throws InvalidUploadFileException {
        if (file != null && !file.isEmpty() && fileName != null) {
            try {
                file.transferTo(new File(System.getProperty(FILES_STORE_PATH_PROPERTY) + fileName));
                return true;
            } catch (IOException exception) {
                log.warn("Failed upload file: {}", exception.getMessage());
                throw new InvalidUploadFileException(exception);
            }
        }
        return false;
    }

    @Override
    public ByteArrayOutputStream findFile(String fileName) {
        if (fileName != null) {
            try {
                File file = new File(System.getProperty(FILES_STORE_PATH_PROPERTY) + fileName);
                if (file.exists()) {
                    ByteArrayOutputStream fileOutputStream = new ByteArrayOutputStream();
                    fileOutputStream.write(Files.readAllBytes(file.toPath()));
                    return fileOutputStream;
                }
            } catch (IOException exception) {
                log.warn("File not found: {}", exception.getMessage());
            }
        }
        return null;
    }

    @Override
    public void deleteFile(String fileName) {
        if (fileName != null) {
            File file = new File(System.getProperty(FILES_STORE_PATH_PROPERTY) + fileName);
            if (file.exists()) {
                boolean resultDeleting = file.delete();
                log.debug("Result of deleting a file from the server :{}", resultDeleting ? "yes" : "no");
            } else {
                log.debug("File not found: {}", fileName);
            }
        }
    }
}
