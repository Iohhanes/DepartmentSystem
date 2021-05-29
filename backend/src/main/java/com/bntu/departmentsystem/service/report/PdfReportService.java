package com.bntu.departmentsystem.service.report;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

public interface PdfReportService {

    ByteArrayOutputStream generateReport(String templateName,
                                         Map<String, String> singleData,
                                         List<Map<String, List<String>>> tableData);
}
