// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import api from "../api/api";
import ProjectDetail from "./ProjectDetail";

function Dashboard({ onLogout }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // For detail page

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load projects");
      }
    };
    fetchProjects();
  }, []);

  // Add new project
  const addProject = async () => {
    if (!title) return alert("Title is required");
    setLoading(true);
    try {
      const res = await api.post("/projects", { name: title, description });
      setProjects([...projects, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add project");
    }
    setLoading(false);
  };

  // If a project is selected, render ProjectDetail
  if (selectedProject) {
    return (
      <ProjectDetail
        projectId={selectedProject.id}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ color: "#228B22" }}>Dashboard</h2>
      <button
        onClick={onLogout}
        style={{
          float: "right",
          backgroundColor: "#FF4500",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      {/* Add Project */}
      <div style={{ marginBottom: "20px", marginTop: "50px" }}>
        <h3 style={{ color: "#4B0082" }}>Add Project</h3>
        <input
          type="text"
          placeholder="Project title"
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
        <button
          onClick={addProject}
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
          {loading ? "Adding..." : "Add Project"}
        </button>
      </div>

      {/* Project List */}
      <h3 style={{ color: "#FF4500" }}>Projects</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => setSelectedProject(project)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              background: "#e6f2ff",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <strong>{project.name}</strong>: {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
