import React from "react";

export default function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className="task-list">
      <h2>Tasks</h2>

      {tasks.length === 0 && (
        <p className="empty-text">No tasks yet. Add one above.</p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-card ${task.completed ? "completed" : ""}`}
        >
          <div className="task-main">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </div>

          <div className="task-actions">
            <button className="btn" onClick={() => onToggleTask(task.id)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button
              className="btn danger"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
