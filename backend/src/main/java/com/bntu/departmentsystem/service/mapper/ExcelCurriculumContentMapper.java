package com.bntu.departmentsystem.service.mapper;

import com.bntu.departmentsystem.model.entity.CurriculumContent;
import com.bntu.departmentsystem.model.excel.ExcelCurriculumContent;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;

import java.util.List;

public interface ExcelCurriculumContentMapper {
    List<CurriculumContent> from(List<ExcelCurriculumContent> excelCurriculumContents) throws InvalidUploadFileException;

    CurriculumContent from(ExcelCurriculumContent excelCurriculumContent) throws InvalidUploadFileException;
}
