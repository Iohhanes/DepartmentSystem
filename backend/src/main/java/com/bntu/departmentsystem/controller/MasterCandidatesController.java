package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.pgstudent.EditPGStudentRequest;
import com.bntu.departmentsystem.model.dto.pgstudent.PGStudentReportRequest;
import com.bntu.departmentsystem.model.entity.PGStudent;
import com.bntu.departmentsystem.service.PGStudentService;
import com.bntu.departmentsystem.utils.HTTPUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

import static com.bntu.departmentsystem.constants.PaginationConstants.DEFAULT_PAGE_SIZE;
import static com.bntu.departmentsystem.constants.PaginationConstants.FIRST_PAGE_INDEX;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/master-candidates")
public class MasterCandidatesController {
    private static final String REPORT_FILE_NAME = "master_candidates_report";

    private final PGStudentService pgStudentService;

    @GetMapping("/page/{page}/count/{count}")
    public List<PGStudent> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return pgStudentService.getAll(page, count, true);
    }

    @GetMapping("/count")
    public Long getTotalCount() {
        return pgStudentService.count(true);
    }

    @GetMapping("/{id}")
    public PGStudent getById(@PathVariable Long id) {
        return pgStudentService.getById(id, true);
    }

    @GetMapping("/search")
    public List<PGStudent> search(@RequestParam(required = false, value = "query") String query) {
        return pgStudentService.findByFullName(query, true);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditPGStudentRequest pgStudentRequest) {
        pgStudentService.add(pgStudentRequest, true);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditPGStudentRequest pgStudentRequest) {
        pgStudentService.edit(id, pgStudentRequest);
    }

    @PostMapping("/delete")
    public List<PGStudent> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        pgStudentService.deleteAll(deleteEntitiesRequest.getIds());
        return pgStudentService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount(), true);
    }

    @PostMapping("/upload")
    public ResponseEntity<PGStudent[]> uploadData(@RequestParam("file") MultipartFile file) {
        try {
            List<PGStudent> pgStudents = pgStudentService.uploadData(file, true);
            pgStudentService.addAll(pgStudents);
            return new ResponseEntity<>(pgStudentService.getAll(FIRST_PAGE_INDEX, DEFAULT_PAGE_SIZE, true)
                    .toArray(new PGStudent[0]), HttpStatus.OK);
        } catch (InvalidUploadFileException exception) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/report/pdf")
    public ResponseEntity<byte[]> downloadPdfReport(@RequestBody PGStudentReportRequest reportRequest) {
        ByteArrayOutputStream outputStream = pgStudentService.generatePdfReport(reportRequest, true);
        return HTTPUtils.formResponseWithFile(outputStream, REPORT_FILE_NAME + ".pdf");
    }

    @PostMapping("/report/word")
    public ResponseEntity<byte[]> downloadWordReport(@RequestBody PGStudentReportRequest reportRequest) {
        ByteArrayOutputStream outputStream = pgStudentService.generateWordReport(reportRequest, true);
        return HTTPUtils.formResponseWithFile(outputStream, REPORT_FILE_NAME + ".docx");
    }
}
