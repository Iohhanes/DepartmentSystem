package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.progressinfo.EditProgressInfoRequest;
import com.bntu.departmentsystem.model.entity.Rank;
import com.bntu.departmentsystem.service.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ranks")
public class RanksController {
    private final RankService rankService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Rank> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return rankService.getAll(page, count);
    }

    @GetMapping
    public List<Rank> getAll() {
        return rankService.getAll();
    }

    @GetMapping("/id/{id}")
    public Rank getById(@PathVariable Long id) {
        return rankService.getById(id);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditProgressInfoRequest progressInfoRequest) {
        rankService.add(progressInfoRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditProgressInfoRequest progressInfoRequest) {
        rankService.edit(id, progressInfoRequest);
    }

    @PostMapping("/delete")
    public List<Rank> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        rankService.deleteAll(deleteEntitiesRequest.getIds());
        return rankService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/search")
    public List<Rank> search(@RequestParam(required = false, value = "query") String query) {
        return rankService.findByTitle(query);
    }
}
