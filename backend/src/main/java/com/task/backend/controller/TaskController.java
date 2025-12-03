package com.task.backend.controller;

import com.task.backend.dto.TaskCreate;
import com.task.backend.dto.TaskUpdate;
import com.task.backend.model.Task;
import com.task.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping("/task")
    public ResponseEntity<List<Task>> getAllTasks(){
        List<Task> res=service.getAllTasks();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<Task> getTask(@PathVariable int id){
        var res=service.getTask(id);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody @Valid TaskCreate dto){
        var res=service.createTaske(dto);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable int id,@RequestBody @Valid TaskUpdate dto){
        var res=service.updateTask(id,dto);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable int id){
        service.deleteTask(id);
        return ResponseEntity.ok("Deleted!");
    }
}
