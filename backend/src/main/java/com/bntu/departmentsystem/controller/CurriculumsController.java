package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.entity.Curriculum;
import com.bntu.departmentsystem.service.CurriculumContentService;
import com.bntu.departmentsystem.service.CurriculumService;
import com.bntu.departmentsystem.utils.exception.InvalidUploadFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.util.List;

import static com.bntu.departmentsystem.constants.HTTPConstants.CONTENT_DISPOSITION;
import static com.bntu.departmentsystem.constants.HTTPConstants.DOCX_CONTENT_TYPE;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/curriculums")
public class CurriculumsController {
    private static final String CURRICULUM_CONTENT_FILE_NAME = "content.docx";

    private final CurriculumService curriculumService;
    private final CurriculumContentService curriculumContentService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Curriculum> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return curriculumService.getAll(page, count);
    }

    @GetMapping("/{id}")
    public Curriculum getById(@PathVariable Long id) {
        return curriculumService.getById(id);
    }

    @PostMapping("/add")
    public ResponseEntity add(@RequestParam("content") MultipartFile content,
                              @RequestParam("yearOfEntry") Integer yearOfEntry,
                              @RequestParam("specialityId") Long specialityId) {
        try {
            curriculumService.add(yearOfEntry, specialityId, content);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (InvalidUploadFileException exception) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PostMapping("/{id}/edit")
    public ResponseEntity edit(@PathVariable Long id,
                               @RequestParam("content") MultipartFile content,
                               @RequestParam("yearOfEntry") Integer yearOfEntry,
                               @RequestParam("specialityId") Long specialityId) {
        try {
            curriculumService.edit(id, yearOfEntry, specialityId, content);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (InvalidUploadFileException exception) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PostMapping("/delete")
    public List<Curriculum> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        curriculumService.deleteAll(deleteEntitiesRequest.getIds());
        return curriculumService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @PostMapping("/{id}/content")
    public ResponseEntity<byte[]> downloadContent(@PathVariable Long id) {
        ByteArrayOutputStream outputStream = curriculumService.downloadContent(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, CONTENT_DISPOSITION + CURRICULUM_CONTENT_FILE_NAME);
        headers.add(HttpHeaders.CONTENT_TYPE, DOCX_CONTENT_TYPE);
        return outputStream == null ? ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build() :
                ResponseEntity.ok().headers(headers).body(outputStream.toByteArray());
    }
}
