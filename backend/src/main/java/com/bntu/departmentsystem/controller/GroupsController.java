package com.bntu.departmentsystem.controller;

import com.bntu.departmentsystem.model.dto.DeleteEntitiesRequest;
import com.bntu.departmentsystem.model.dto.group.EditGroupRequest;
import com.bntu.departmentsystem.model.entity.Group;
import com.bntu.departmentsystem.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups")
public class GroupsController {
    private final GroupService groupService;

    @GetMapping("/page/{page}/count/{count}")
    public List<Group> getAll(@PathVariable Integer page, @PathVariable Integer count) {
        return groupService.getAll(page, count);
    }

    @GetMapping
    public List<Group> getAll() {
        return groupService.getAll();
    }

    @GetMapping("/count")
    public Long getTotalCount() {
        return groupService.count();
    }

    @GetMapping("/{id}")
    public Group getById(@PathVariable Long id) {
        return groupService.getById(id);
    }

    @PostMapping("/add")
    public void add(@RequestBody EditGroupRequest groupRequest) {
        groupService.add(groupRequest);
    }

    @PostMapping("/{id}/edit")
    public void edit(@PathVariable Long id, @RequestBody EditGroupRequest groupRequest) {
        groupService.edit(id, groupRequest);
    }

    @PostMapping("/delete")
    public List<Group> delete(@RequestBody DeleteEntitiesRequest deleteEntitiesRequest) {
        groupService.deleteAll(deleteEntitiesRequest.getIds());
        return groupService.getAll(deleteEntitiesRequest.getPage(), deleteEntitiesRequest.getCount());
    }

    @GetMapping("/search")
    public List<Group> search(@RequestParam(required = false, value = "query") String query) {
        return groupService.findByNumber(query);
    }
}
