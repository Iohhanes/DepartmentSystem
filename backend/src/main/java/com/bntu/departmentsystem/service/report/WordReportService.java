package com.bntu.departmentsystem.service.report;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface WordReportService {

    ByteArrayOutputStream generateReport(InputStream template,
                                         Map<String, String> singleData,
                                         List<Map<String, List<String>>> tableData);
}
