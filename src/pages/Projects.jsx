import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; 

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    progress: 0,
    deadline: "",
    links: [{ title: "", url: "" }]
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useNavigate(); 

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://iat-backend-5h88.onrender.com/api/v1/projects");
      setProjects(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  // Handle link changes for new project
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...newProject.links];
    updatedLinks[index][field] = value;
    setNewProject({ ...newProject, links: updatedLinks });
  };

  // Handle link changes for existing project
  const handleExistingLinkChange = (projectId, index, field, value) => {
    const updatedProjects = projects.map(project => {
      if (project._id === projectId) {
        const updatedLinks = [...project.links];
        updatedLinks[index][field] = value;
        return { ...project, links: updatedLinks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Add new link field to new project
  const handleAddLink = () => {
    setNewProject({
      ...newProject,
      links: [...newProject.links, { title: "", url: "" }]
    });
  };

  // Add new link field to existing project
  const handleAddLinkToProject = (projectId) => {
    const updatedProjects = projects.map(project => {
      if (project._id === projectId) {
        return {
          ...project, 
          links: [...project.links, { title: "", url: "" }]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Remove link field from new project
  const handleRemoveLink = (index) => {
    const updatedLinks = newProject.links.filter((_, i) => i !== index);
    setNewProject({ ...newProject, links: updatedLinks });
  };

  // Remove link field from existing project
  const handleRemoveLinkFromProject = (projectId, index) => {
    const updatedProjects = projects.map(project => {
      if (project._id === projectId) {
        const updatedLinks = project.links.filter((_, i) => i !== index);
        return { ...project, links: updatedLinks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Submit new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Prepare the project data for submission
      const projectToSubmit = {
        name: newProject.name,
        description: newProject.description,
        progress: Number(newProject.progress),
        deadline: new Date(newProject.deadline).toISOString(),
        links: newProject.links
          .filter(link => link.title && link.url) // Remove empty links
          .map(link => ({
            title: link.title,
            url: link.url.startsWith('http') ? link.url : `https://${link.url}`
          }))
      };

      const response = await axios.post(
        "https://iat-backend-5h88.onrender.com/api/v1/projects/",
        projectToSubmit,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        fetchProjects(); // Refresh the projects list
        resetForm();
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      console.error("Save error:", err);
      setError(err.response?.data?.error || 
              err.response?.data?.message || 
              "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  // Update existing project
  const handleUpdateProject = async (projectId) => {
    try {
      setLoading(true);
      const projectToUpdate = projects.find(project => project._id === projectId);
      
      const projectData = {
        name: projectToUpdate.name,
        description: projectToUpdate.description,
        progress: Number(projectToUpdate.progress),
        deadline: new Date(projectToUpdate.deadline).toISOString(),
        links: projectToUpdate.links
          .filter(link => link.title && link.url) // Remove empty links
          .map(link => ({
            title: link.title,
            url: link.url.startsWith('http') ? link.url : `https://${link.url}`
          }))
      };

      const response = await axios.put(
        `https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}`,
        projectData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setEditingProject(null);
        setError(""); // Clear any previous errors
        alert("Project updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.error || 
              err.response?.data?.message || 
              "Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        setLoading(true);
        await axios.delete(`https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}`);
        // Refresh the projects list after deletion
        fetchProjects();
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete project");
      } finally {
        setLoading(false);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setNewProject({
      name: "",
      description: "",
      progress: 0,
      deadline: "",
      links: [{ title: "", url: "" }]
    });
    setShowAddForm(false);
  };

  // Function to navigate to project detail page
  const handleViewProjectDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // Toggle edit mode for a project
  const toggleEditMode = (projectId) => {
    setEditingProject(editingProject === projectId ? null : projectId);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Admin Notice */}
      <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-400 px-4 py-3 text-center">
        <p className="font-bold">ADMIN NOTICE:</p>
        <p>Only administrators are allowed to add or delete projects. Interns do not have permission to modify project data.</p>
      </div>

      {/* Hero Section */}
      <section className="py-6 text-center bg-gradient-to-b from-blue-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-400 mb-4 md:mb-6">
            Our Projects
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Explore the ongoing and completed projects by Aartech Solonics Limited.
          </p>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-medium transition"
          >
            {showAddForm ? "Cancel" : "Add New Project"}
          </button>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Add Project Form */}
      {showAddForm && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-blue-900/30">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6">
                {/* Project Name */}
                <div>
                  <label className="block text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProject.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    rows="3"
                    required
                  />
                </div>

                {/* Progress */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    Progress ({newProject.progress}%)
                  </label>
                  <input
                    type="range"
                    name="progress"
                    min="0"
                    max="100"
                    value={newProject.progress}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-gray-300 mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={newProject.deadline}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Project Links */}
                <div>
                  <label className="block text-gray-300 mb-2">Project Links</label>
                  {newProject.links.map((link, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Link Title"
                          value={link.title}
                          onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="url"
                          placeholder="https://example.com"
                          value={link.url}
                          onChange={(e) => handleLinkChange(index, "url", e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      {newProject.links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg self-center"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mt-2"
                  >
                    Add Another Link
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition flex-1"
                >
                  {loading ? "Saving..." : "Save Project"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Projects List */}
      <section className="flex-grow py-12 bg-gradient-to-b from-black to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading && !showAddForm ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400 mb-4"></div>
              <p className="text-gray-400">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-900 rounded-xl p-5 shadow-lg border border-gray-800 hover:border-blue-400/30 transition-all hover:shadow-blue-500/20"
                >
                  {editingProject === project._id ? (
                    // Edit mode
                    <>
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Project Name</label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p => 
                              p._id === project._id ? {...p, name: e.target.value} : p
                            );
                            setProjects(updatedProjects);
                          }}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p => 
                              p._id === project._id ? {...p, description: e.target.value} : p
                            );
                            setProjects(updatedProjects);
                          }}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                          rows="3"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2">
                          Progress ({project.progress}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={project.progress}
                          onChange={(e) => {
                            const updatedProjects = projects.map(p => 
                              p._id === project._id ? {...p, progress: e.target.value} : p
                            );
                            setProjects(updatedProjects);
                          }}
                          className="w-full"
                        />
                      </div>
                      
                      {project.deadline && (
                        <div className="mb-4">
                          <label className="block text-gray-300 mb-2">Deadline</label>
                          <input
                            type="date"
                            value={new Date(project.deadline).toISOString().split('T')[0]}
                            onChange={(e) => {
                              const updatedProjects = projects.map(p => 
                                p._id === project._id ? {...p, deadline: e.target.value} : p
                              );
                              setProjects(updatedProjects);
                            }}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                          />
                        </div>
                      )}
                      
                      {/* Project Links Editor */}
                      <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Project Links</label>
                        {project.links.map((link, index) => (
                          <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3">
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="Link Title"
                                value={link.title}
                                onChange={(e) => handleExistingLinkChange(project._id, index, "title", e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                              />
                            </div>
                            <div className="flex-1">
                              <input
                                type="url"
                                placeholder="https://example.com"
                                value={link.url}
                                onChange={(e) => handleExistingLinkChange(project._id, index, "url", e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveLinkFromProject(project._id, index)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-lg self-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddLinkToProject(project._id)}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mt-2"
                        >
                          Add Another Link
                        </button>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleUpdateProject(project._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => toggleEditMode(project._id)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    // View mode
                    <>
                      <h3 
                        className="text-xl font-bold text-blue-400 mb-3 cursor-pointer hover:text-blue-300"
                        onClick={() => handleViewProjectDetails(project._id)}
                      >
                        {project.name}
                      </h3>
                      <p className="text-gray-300 mb-5 text-sm">{project.description}</p>

                      {/* Progress bar */}
                      <div className="mb-5">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              project.progress < 30
                                ? "bg-red-500"
                                : project.progress < 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Deadline */}
                      {project.deadline && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                        </div>
                      )}

                      {/* Note about clicking links */}
                      {project.links && project.links.length > 0 && (
                        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mb-4">
                          <p className="text-blue-300 text-xs text-center">
                            Click on the links below to learn more about this project
                          </p>
                        </div>
                      )}

                      {/* Project Links */}
                      {project.links && project.links.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-gray-400 text-sm font-medium mb-2">Project Links:</h4>
                          <ul className="space-y-1">
                            {project.links.map((link, index) => (
                              <li key={index}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 flex items-center transition text-sm"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                  {link.title || "Project Link"}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => toggleEditMode(project._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                        >
                          Edit Project
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                        >
                          Delete Project
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}