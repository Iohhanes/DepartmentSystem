package com.bntu.departmentsystem.service.impl.report;

import com.bntu.departmentsystem.service.report.PdfReportService;
import com.bntu.departmentsystem.service.report.WordReportService;
import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class PdfReportServiceImpl implements PdfReportService {
    private final WordReportService wordReportService;

    @Override
    public ByteArrayOutputStream generateReport(String templateName,
                                                Map<String, String> singleData,
                                                List<Map<String, List<String>>> tableData) {
        ByteArrayOutputStream documentBytes = wordReportService.generateReport(templateName, singleData, tableData);
        if (documentBytes != null) {
            ByteArrayOutputStream pdfBytes = new ByteArrayOutputStream();

            IConverter converter = LocalConverter.builder().build();
            converter.convert(new ByteArrayInputStream(documentBytes.toByteArray()))
                    .as(DocumentType.DOCX)
                    .to(pdfBytes)
                    .as(DocumentType.PDF)
                    .execute();
            return pdfBytes;
        }
        return null;
    }
}
