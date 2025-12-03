// src/components/TaskList.jsx
import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setErr(null);
    try {
      // backend GET /task returns list
      const res = await api.get("/task");
      setTasks(res.data);
    } catch (e) {
      setErr(
        e?.response?.data?.message ||
          e?.response?.data ||
          e.message ||
          "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const handler = () => fetchTasks();
    window.addEventListener("task-changed", handler);
    return () => window.removeEventListener("task-changed", handler);
  }, []);

  const toggleComplete = async (task) => {
    try {
      await api.put(`/task/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (e) {
      alert("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/task/${id}`);
      fetchTasks();
    } catch (e) {
      alert("Failed to delete task");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (err) return <p style={{ color: "red" }}>{err}</p>;

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            padding: 12,
            border: "1px solid #eee",
            marginBottom: 10,
            borderRadius: 8,
            background: task.completed ? "#e6ffed" : "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </h3>
            {task.description && (
              <p style={{ margin: "6px 0 0 0" }}>{task.description}</p>
            )}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => toggleComplete(task)} className="btn">
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>

            <button onClick={() => deleteTask(task.id)} className="btn danger">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
