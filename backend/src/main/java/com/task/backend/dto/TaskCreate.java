package com.task.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskCreate {

    @NotBlank
    private String title;
    private String description;
}
