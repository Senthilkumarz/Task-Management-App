import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  const [token, setToken] = useState(null); // JWT token
  const [showRegister, setShowRegister] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleLogin = (jwtToken) => {
    setToken(jwtToken);
  };

  const handleLogout = () => {
    setToken(null);
    setShowRegister(false);
    setSelectedProject(null);
  };

  const switchToRegister = () => setShowRegister(true);
  const switchToLogin = () => setShowRegister(false);

  // If user not logged in, show login/register
  if (!token) {
    return showRegister ? (
      <Register onRegisterSuccess={switchToLogin} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
    );
  }

  // If a project is selected, show ProjectDetail page
  if (selectedProject) {
    return (
      <ProjectDetail
        projectId={selectedProject.id}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  // Default: Dashboard page
  return <Dashboard onLogout={handleLogout} onSelectProject={setSelectedProject} />;
}

export default App;
