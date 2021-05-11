package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.student.EditStudentRequest;
import com.bntu.departmentsystem.model.dto.student.StudentReportRequest;
import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.service.StudentService;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;

import static com.bntu.departmentsystem.constants.HTTPConstants.CONTENT_DISPOSITION;
import static com.bntu.departmentsystem.constants.HTTPConstants.DOCX_CONTENT_TYPE;
import static com.bntu.departmentsystem.constants.PaginationConstants.DEFAULT_PAGE_SIZE;
import static com.bntu.departmentsystem.constants.PaginationConstants.FIRST_PAGE_INDEX;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/students")
public class StudentsController {
    private static final String REPORT_FILE_NAME = "students_report.docx";

    private final StudentService studentService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Student> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return studentService.getAll(page, count);
    }

    @GetMapping("/{id}")
    public Student getById(@PathVariable Long id) {
        return studentService.getById(id);
    }

    @GetMapping("/search")
    public List<Student> search(@RequestParam(required = false, value = "query") String query) {
        return studentService.findByFullName(query);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditStudentRequest studentRequest) {
        studentService.add(studentRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditStudentRequest studentRequest) {
        studentService.edit(id, studentRequest);
    }

    @PostMapping("/delete")
    public List<Student> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        studentService.deleteAll(deleteEntitiesRequest.getIds());
        return studentService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/group/{id}")
    public List<Student> getStudentsByGroup(@PathVariable Long id) {
        return studentService.findByGroup(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<Student[]> uploadData(@RequestParam("file") MultipartFile file) {
        try {
            List<Student> students = studentService.uploadData(file);
            studentService.addAll(students);
            return new ResponseEntity<>(studentService.getAll(FIRST_PAGE_INDEX, DEFAULT_PAGE_SIZE)
                    .toArray(new Student[0]), HttpStatus.OK);
        } catch (InvalidUploadFileException exception) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/report")
    public ResponseEntity<byte[]> downloadReport(@RequestBody StudentReportRequest reportRequest) {
        ByteArrayOutputStream outputStream = studentService.generateReport(reportRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, CONTENT_DISPOSITION + REPORT_FILE_NAME);
        headers.add(HttpHeaders.CONTENT_TYPE, DOCX_CONTENT_TYPE);
        return outputStream == null ? ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build() :
                ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
    }
}
