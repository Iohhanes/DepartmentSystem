package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.speciality.EditSpecialityRequest;
import com.bntu.departmentsystem.model.entity.Speciality;
import com.bntu.departmentsystem.service.SpecialityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/specialities")
public class SpecialitiesController {
    private final SpecialityService specialityService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Speciality> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return specialityService.getAll(page, count);
    }

    @GetMapping
    public List<Speciality> getAll() {
        return specialityService.getAll();
    }

    @GetMapping("/{id}")
    public Speciality getById(@PathVariable Long id) {
        return specialityService.getById(id);
    }

    @PostMapping("/add")
    public void addSpeciality(@RequestBody EditSpecialityRequest specialityRequest) {
        specialityService.add(specialityRequest);
    }

    @PostMapping("/{id}/edit")
    public void editSpeciality(@PathVariable Long id, @RequestBody EditSpecialityRequest specialityRequest) {
        specialityService.edit(id, specialityRequest);
    }

    @PostMapping("/delete")
    public List<Speciality> deleteSpeciality(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        specialityService.deleteAll(deleteEntitiesRequest.getIds());
        return specialityService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/search")
    public List<Speciality> search(@RequestParam(required = false, value = "query") String query) {
        return specialityService.findByCode(query);
    }
}
