package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.facultymember.EditFacultyMemberRequest;
import com.bntu.departmentsystem.model.dto.facultymember.FacultyMemberReportRequest;
import com.bntu.departmentsystem.model.entity.FacultyMember;
import com.bntu.departmentsystem.service.FacultyMemberService;
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
@RequestMapping("/api/faculty-members")
public class FacultyMembersController {
    private static final String REPORT_FILE_NAME = "faculty_members_report.docx";

    private final FacultyMemberService facultyMemberService;

    @GetMapping("/page/{page}/count/{count}")
    public List<FacultyMember> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return facultyMemberService.getAll(page, count);
    }

    @GetMapping
    public List<FacultyMember> getAll() {
        return facultyMemberService.getAll();
    }

    @GetMapping("/count")
    public Long getTotalCount() {
        return facultyMemberService.count();
    }

    @GetMapping("/{id}")
    public FacultyMember getById(@PathVariable Long id) {
        return facultyMemberService.getById(id);
    }

    @GetMapping("/search")
    public List<FacultyMember> search(@RequestParam(required = false, value = "query") String query) {
        return facultyMemberService.findByFullName(query);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditFacultyMemberRequest facultyMemberRequest) {
        facultyMemberService.add(facultyMemberRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditFacultyMemberRequest facultyMemberRequest) {
        facultyMemberService.edit(id, facultyMemberRequest);
    }

    @PostMapping("/delete")
    public List<FacultyMember> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        facultyMemberService.deleteAll(deleteEntitiesRequest.getIds());
        return facultyMemberService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @PostMapping("/upload")
    public ResponseEntity<FacultyMember[]> uploadData(@RequestParam("file") MultipartFile file) {
        try {
            List<FacultyMember> pgStudents = facultyMemberService.uploadData(file);
            facultyMemberService.addAll(pgStudents);
            return new ResponseEntity<>(facultyMemberService.getAll(FIRST_PAGE_INDEX, DEFAULT_PAGE_SIZE)
                    .toArray(new FacultyMember[0]), HttpStatus.OK);
        } catch (InvalidUploadFileException exception) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/report")
    public ResponseEntity<byte[]> downloadReport(@RequestBody FacultyMemberReportRequest reportRequest) {
        ByteArrayOutputStream outputStream = facultyMemberService.generateReport(reportRequest);
        return HTTPUtils.formResponseWithFile(outputStream, REPORT_FILE_NAME);
    }
}
