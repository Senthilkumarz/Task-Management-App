import React, { useState, useEffect } from "react";
import api from "../api/api";

function ProjectDetail({ projectId, onBack }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [assignee, setAssignee] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/tasks?projectId=${projectId}`);
        setTasks(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load tasks");
      }
    };
    fetchTasks();
  }, [projectId]);

  // Add task
  const addTask = async () => {
    if (!title) return alert("Task title required");
    setLoading(true);
    try {
      const res = await api.post("/tasks", {
        title,
        description,
        status,
        assignee,
        ProjectId: projectId,
      });
      setTasks([...tasks, res.data]);
      setTitle(""); setDescription(""); setStatus("todo"); setAssignee("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add task");
    }
    setLoading(false);
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(
    (t) =>
      (!filterStatus || t.status === filterStatus) &&
      (!filterAssignee || t.assignee.includes(filterAssignee))
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button
        onClick={onBack}
        style={{
          backgroundColor: "#FF4500",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Back to Dashboard
      </button>

      <h2 style={{ color: "#228B22" }}>Project Tasks</h2>

      {/* Add Task */}
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h3 style={{ color: "#4B0082" }}>Add Task</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        />
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={addTask}
          disabled={loading}
          style={{
            backgroundColor: "#4B0082",
            color: "white",
            padding: "5px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Filter Tasks</h4>
        <input
          type="text"
          placeholder="Filter by assignee"
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", borderRadius: "5px" }}
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Task List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              background: "#f0f8ff",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{task.title}</strong> - {task.description} |{" "}
              <em>{task.status}</em> | <strong>{task.assignee}</strong>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: "#FF4500",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetail;
