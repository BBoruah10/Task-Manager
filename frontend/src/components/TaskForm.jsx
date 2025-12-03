// src/components/TaskForm.jsx
import React, { useState } from "react";
import { api } from "../api";

export default function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!task.title.trim()) return;

    setLoading(true);
    try {
      // backend expects POST /task
      await api.post("/task", task);
      setTask({ title: "", description: "" });
      window.dispatchEvent(new CustomEvent("task-changed"));
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          err.message ||
          "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        className="input"
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <input
        className="input"
        type="text"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>

      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
