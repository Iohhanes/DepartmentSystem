package com.bntu.departmentsystem.service.impl.report;

import com.bntu.departmentsystem.service.report.WordReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class WordReportServiceImpl implements WordReportService {
    private static final String MARKUP_START_FOR_REPLACE = "\\$\\{";
    private static final String MARKUP_START = "${";
    private static final String MARKUP_END = "}";
    private static final String TABLE_MARKUP_CHARACTER = "!";
    private static final String TEMPLATES_PATH = "classpath:templates/";

    @Override
    public ByteArrayOutputStream generateReport(String templateName,
                                                Map<String, String> singleData,
                                                List<Map<String, List<String>>> tableData) {
        try {
            File template = ResourceUtils.getFile(TEMPLATES_PATH + templateName);
            XWPFDocument document = new XWPFDocument(new FileInputStream(template));
            insertSingleValues(document, singleData);
            for (int i = 0; i < tableData.size(); i++) {
                insertTableValues(document, i, tableData.get(i));
            }
            ByteArrayOutputStream documentBytes = new ByteArrayOutputStream();
            document.write(documentBytes);

            return documentBytes;
        } catch (IOException exception) {
            log.warn("Cannot read template: {}", exception.getMessage());
        }
        return null;
    }

    private void insertSingleValues(XWPFDocument document, Map<String, String> singleData) {
        List<XWPFParagraph> paragraphs = document.getParagraphs();
        for (XWPFParagraph paragraph : paragraphs) {
            String text = paragraph.getText();
            if (checkSingleValueText(text)) {
                List<XWPFRun> runs = paragraph.getRuns();
                int runsSize = runs.size();
                if (runsSize > 1) {
                    for (int i = 1; i < runsSize; i++) {
                        paragraph.removeRun(0);
                    }
                }
                String result = getReplacedSingleValue(text, singleData);
                runs.get(0).setText(result, 0);
            }
        }
    }

    private void insertTableValues(XWPFDocument document, int tableIndex, Map<String, List<String>> tableData) {
        List<XWPFTable> tables = document.getTables();
        if (!CollectionUtils.isEmpty(tables) && tables.get(tableIndex) != null) {

            XWPFTable table = tables.get(tableIndex);
            XWPFTableRow firstRow = table.getRow(1);
            insertNewRows(table, tableData);
            Map<String, List<String>> transformedTableData = transformTableData(firstRow, tableData);

            List<XWPFTableRow> rows = table.getRows();
            for (int i = 1; i < rows.size(); i++) {
                XWPFTableRow newRow = table.getRow(i);
                List<XWPFTableCell> cells = newRow.getTableCells();
                for (Map.Entry<String, List<String>> entry : transformedTableData.entrySet()) {
                    XWPFTableCell cell = cells.get(Integer.parseInt(entry.getKey()));
                    String newValue = (i - 1) < entry.getValue().size() ? entry.getValue().get(i - 1) : null;
                    if (!CollectionUtils.isEmpty(cell.getParagraphs())) {
                        cell.removeParagraph(0);
                        cell.setText("");
                    }
                    if (newValue != null) {
                        cell.setText(newValue);
                    }
                }
            }
        }
    }

    private boolean checkSingleValueText(String text) {
        return text.contains(MARKUP_START) && !text.contains(MARKUP_START + TABLE_MARKUP_CHARACTER);
    }

    private String getReplacedSingleValue(String text, Map<String, String> singleData) {
        for (Map.Entry<String, String> entry : singleData.entrySet()) {
            String wordKey = MARKUP_START + entry.getKey() + MARKUP_END;
            if (text.contains(wordKey)) {
                return text.replaceFirst(MARKUP_START_FOR_REPLACE + entry.getKey() + MARKUP_END, entry.getValue());
            }
        }
        return text;
    }

    private void insertNewRows(XWPFTable table, Map<String, List<String>> tableData) {
        int count = tableData.values().stream().mapToInt(List::size).max().orElse(0);
        if (count != 0) {
            for (int i = 1; i < count; i++) {
                table.createRow();
            }
        }
    }

    private Map<String, List<String>> transformTableData(XWPFTableRow firstRow, Map<String, List<String>> tableData) {
        Map<String, List<String>> transformedTableData = new HashMap<>();
        for (Map.Entry<String, List<String>> entry : tableData.entrySet()) {
            int index = 0;
            for (XWPFTableCell cell : firstRow.getTableCells()) {
                if (cell.getText().contains(MARKUP_START + TABLE_MARKUP_CHARACTER + entry.getKey() + MARKUP_END)) {
                    break;
                }
                index++;
            }
            transformedTableData.put(String.valueOf(index), entry.getValue());
        }
        return transformedTableData;
    }
}
