package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.subject.EditSubjectRequest;
import com.bntu.departmentsystem.model.entity.Subject;
import com.bntu.departmentsystem.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subjects")
public class SubjectsController {
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

    @GetMapping("/id/{id}")
    public Subject getById(@PathVariable Long id) {
        return subjectService.getById(id);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditSubjectRequest subjectRequest) {
        subjectService.add(subjectRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditSubjectRequest subjectRequest) {
        subjectService.edit(id, subjectRequest);
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
}
