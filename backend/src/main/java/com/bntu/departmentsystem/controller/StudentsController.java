package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.student.EditStudentRequest;
import com.bntu.departmentsystem.model.entity.Student;
import com.bntu.departmentsystem.service.StudentService;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/students")
public class StudentsController {
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
    public void addSpeciality(@RequestBody EditStudentRequest studentRequest) {
        studentService.add(studentRequest);
    }

    @PostMapping("/{id}/edit")
    public void editSpeciality(@PathVariable Long id, @RequestBody EditStudentRequest studentRequest) {
        studentService.edit(id, studentRequest);
    }

    @PostMapping("/delete")
    public List<Student> deleteSpeciality(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
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
            return new ResponseEntity<>(studentService.getAll(0, 10).toArray(new Student[0]), HttpStatus.OK);
        } catch (InvalidUploadFileException exception) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/report")
    public ResponseEntity<byte[]> test() {
        List<Student> students = studentService.getAll(0, 10);
        ByteArrayOutputStream outputStream = studentService.generateReport(students);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment;filename=students.docx");
        headers.add("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        return ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
    }
}
