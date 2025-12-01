import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    onAddTask(task);
    setTask({ title: "", description: "" });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        className="input"
        type="text"
        placeholder="Task title"
        value={task.title}
        onChange={(e) =>
          setTask((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      <textarea
        className="textarea"
        placeholder="Description (optional)"
        value={task.description}
        onChange={(e) =>
          setTask((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      <button className="btn primary" type="submit">
        Add Task
      </button>
    </form>
  );
}
