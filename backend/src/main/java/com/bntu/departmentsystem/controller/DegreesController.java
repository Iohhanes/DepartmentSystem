package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Degree;
import com.bntu.departmentsystem.service.DegreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/degrees")
public class DegreesController {
    private final DegreeService degreeService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Degree> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return degreeService.getAll(page, count);
    }

    @GetMapping
    public List<Degree> getAll() {
        return degreeService.getAll();
    }

    @GetMapping("/id/{id}")
    public Degree getById(@PathVariable Long id) {
        return degreeService.getById(id);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditProgressInfoRequest progressInfoRequest) {
        degreeService.add(progressInfoRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditProgressInfoRequest progressInfoRequest) {
        degreeService.edit(id, progressInfoRequest);
    }

    @PostMapping("/delete")
    public List<Degree> deleteSpeciality(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        degreeService.deleteAll(deleteEntitiesRequest.getIds());
        return degreeService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/search")
    public List<Degree> search(@RequestParam(required = false, value = "query") String query) {
        return degreeService.findByTitle(query);
    }
}
