package com.task.backend.service;

import com.task.backend.dto.TaskCreate;
import com.task.backend.dto.TaskUpdate;
import com.task.backend.exception.NotFoundException;
import com.task.backend.model.Task;
import com.task.backend.repository.TaskRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepo repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task getTask(int id) {
        return repo.findById(id).orElseThrow(()->new NotFoundException("Task not found!"));
    }

    public Task createTaske(@Valid TaskCreate dto) {

        Task task=Task.builder().title(dto.getTitle()).description(dto.getDescription()).completed(false).build();
        return repo.save(task);
    }

    public void deleteTask(int id) {
        repo.deleteById(id);
    }

    public Task updateTask(int id, @Valid TaskUpdate dto) {
        Task existing=getTask(id);

        Task updated=Task.builder()
                .id(existing.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .completed(dto.isCompleted()).build();

        return repo.save(updated);
    }
}
