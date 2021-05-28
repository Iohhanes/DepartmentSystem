package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.entity.Subject;
import com.bntu.departmentsystem.service.SubjectService;
import com.bntu.departmentsystem.utils.HTTPUtils;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subjects")
public class SubjectsController {
    private final static String SUBJECT_CONTENT_FILE_NAME = "subject_content.docx";

    private final SubjectService subjectService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Subject> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return subjectService.getAll(page, count);
    }

    @GetMapping
    public List<Subject> getAll() {
        return subjectService.getAll();
    }

    @GetMapping("/count")
    public Long getTotalCount() {
        return subjectService.count();
    }

    @GetMapping("/{id}")
    public Subject getById(@PathVariable Long id) {
        return subjectService.getById(id);
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestParam("content") MultipartFile content, @RequestParam("title") String title) {
        try {
            subjectService.add(content, title);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (InvalidUploadFileException exception) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PostMapping("/{id}/edit")
    public ResponseEntity edit(@PathVariable Long id,
                               @RequestParam("content") MultipartFile content,
                               @RequestParam("title") String title) {
        try {
            subjectService.edit(id, content, title);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (InvalidUploadFileException exception) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PostMapping("/delete")
    public List<Subject> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        subjectService.deleteAll(deleteEntitiesRequest.getIds());
        return subjectService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/search")
    public List<Subject> search(@RequestParam(required = false, value = "query") String query) {
        return subjectService.findByTitle(query);
    }

    @PostMapping("/{id}/content")
    public ResponseEntity<byte[]> downloadContent(@PathVariable Long id) {
        ByteArrayOutputStream outputStream = subjectService.downloadContent(id);
        return HTTPUtils.formResponseWithFile(outputStream, SUBJECT_CONTENT_FILE_NAME);
    }
}
