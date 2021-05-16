package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Position;
import com.bntu.departmentsystem.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/positions")
public class PositionsController {
    private final PositionService positionService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Position> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return positionService.getAll(page, count);
    }

    @GetMapping
    public List<Position> getAll() {
        return positionService.getAll();
    }

    @GetMapping("/count")
    public Long getTotalCount() {
        return positionService.count();
    }

    @GetMapping("/id/{id}")
    public Position getById(@PathVariable Long id) {
        return positionService.getById(id);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditProgressInfoRequest progressInfoRequest) {
        positionService.add(progressInfoRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditProgressInfoRequest progressInfoRequest) {
        positionService.edit(id, progressInfoRequest);
    }

    @PostMapping("/delete")
    public List<Position> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        positionService.deleteAll(deleteEntitiesRequest.getIds());
        return positionService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/search")
    public List<Position> search(@RequestParam(required = false, value = "query") String query) {
        return positionService.findByTitle(query);
    }
}
