package com.bntu.departmentsystem.service.parser;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ExcelParseService<T> {
    List<T> parse(MultipartFile excelFile, Class<T> tClass) throws Exception;
}
