package com.task.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskUpdate {
    @NotBlank
    private String title;
    private String description;
    private boolean completed;
}
