package com.bntu.departmentsystem.service.impl.parser;

import com.bntu.departmentsystem.service.parser.ExcelParseService;
import com.poiji.bind.Poiji;
import com.poiji.exception.PoijiExcelType;
import com.poiji.option.PoijiOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcelParseServiceImpl<T> implements ExcelParseService<T> {
    private static final int NOT_FOUND_NO_EMPTY_CELL_INDEX = -1;

    @Override
    public List<T> parse(MultipartFile excelFile, Class<T> tClass) throws Exception {
        int headerStart = getFirstNoEmptyCellIndex(excelFile.getInputStream());
        PoijiOptions options = PoijiOptions.PoijiOptionsBuilder
                .settings()
                .sheetIndex(0)
                .headerStart(headerStart)
                .build();
        return Poiji.fromExcel(excelFile.getInputStream(), PoijiExcelType.XLSX, tClass, options);
    }

    private int getFirstNoEmptyCellIndex(InputStream excelFileInputStream) {
        try {
            if (excelFileInputStream != null) {
                Workbook workbook = new XSSFWorkbook(excelFileInputStream);
                Sheet firstSheet = workbook.getSheetAt(0);
                for (Row row : firstSheet) {
                    for (Cell cell : row) {
                        if (cell != null &&
                                cell.getCellType() != CellType.BLANK &&
                                !(cell.getCellType() == CellType.STRING && cell.getStringCellValue().trim().isEmpty())) {
                            return cell.getRowIndex();
                        }
                    }
                }
            }
        } catch (IOException exception) {
            log.warn("Cannot find first no empty cell: {}", exception.getMessage());
        }
        return NOT_FOUND_NO_EMPTY_CELL_INDEX;
    }
}
