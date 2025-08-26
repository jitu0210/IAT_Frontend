import React, { useEffect, useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const COLORS = [
  "#60A5FA",
  "#34D399",
  "#FBBF24",
  "#F87171",
  "#A78BFA",
  "#F472B6",
  "#10B981",
];

const ProgressButton = ({ projectId, currentProgress, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(currentProgress);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}/progress`,
        { progress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data) {
        onUpdate(projectId, response.data.progress);
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update progress");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded text-sm ${
          currentProgress < 30
            ? "bg-red-600 hover:bg-red-700"
            : currentProgress < 70
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {currentProgress}%
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 left-0 sm:left-auto sm:right-0 w-64 p-4 bg-[#1E293B] rounded-lg shadow-lg border border-blue-900/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Progress:</span>
            <span className="font-bold">{progress}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(parseInt(e.target.value))}
            className="w-full mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    interns: 0,
    projects: 0,
    groups: 0,
    startDate: "Loading...",
    status: "Loading...",
  });
  const [internsData, setInternsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    deadline: "",
    progress: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onPieEnter = useCallback((_, index) => setActiveIndex(index), []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      
      // Fetch interns by department
      const internsRes = await axios.get(
        "https://iat-backend-5h88.onrender.com/api/v1/user/department-counts",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (internsRes.data && internsRes.data.length) {
        const transformedInternsData = internsRes.data.map((item) => ({
          name: item.department,
          value: item.count,
        }));
        setInternsData(transformedInternsData);

        const totalInterns = transformedInternsData.reduce(
          (sum, item) => sum + item.value,
          0
        );
        setStats((prev) => ({ ...prev, interns: totalInterns, groups: 5 }));
      } else {
        setInternsData([]);
      }

      // Fetch projects
      const projectsRes = await axios.get(
        "https://iat-backend-5h88.onrender.com/api/v1/projects",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (projectsRes.data && projectsRes.data.length) {
        setProjectsData(projectsRes.data);
        setStats((prev) => ({ ...prev, projects: projectsRes.data.length }));
      } else {
        setProjectsData([]);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load dashboard data. Please try again later.");
      setInternsData([]);
      setProjectsData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://iat-backend-5h88.onrender.com/api/v1/projects/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProjectsData((prev) => prev.filter((p) => p._id !== id));
      setStats((prev) => ({ ...prev, projects: prev.projects - 1 }));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete project");
    }
  };

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.deadline) {
      alert("Project name and deadline are required");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://iat-backend-5h88.onrender.com/api/v1/projects",
        newProject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data) {
        setProjectsData((prev) => [...prev, response.data]);
        setStats((prev) => ({ ...prev, projects: prev.projects + 1 }));
        setNewProject({ name: "", description: "", deadline: "", progress: 0 });
      }
    } catch (err) {
      console.error("Add failed", err);
      alert("Failed to add project");
    }
  };

  const handleUpdateProgress = (projectId, newProgress) => {
    setProjectsData((prev) =>
      prev.map((project) =>
        project._id === projectId
          ? { ...project, progress: newProgress }
          : project
      )
    );
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;
    return (
      <g>
        <Pie
          dataKey="value"
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          fill={fill}
          data={[{ value: 1 }]}
          isAnimationActive={false}
        />
      </g>
    );
  };

  if (loading && !internsData.length) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl">Loading dashboard data...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-xl text-red-400">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Section - Responsive layout */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => navigate("/interns-form")}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Fill Intern Activity Form
          </button>
        </div>

        {/* Stats - Responsive grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <button
            onClick={() => navigate("/projects")}
            className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition"
          >
            <div className="text-lg font-bold text-white">Total Projects</div>
            <div className="mt-1 text-3xl font-bold text-blue-400 group-hover:text-blue-300">
              {loading ? "..." : stats.projects}
            </div>
          </button>

          <button
            onClick={() => navigate("/interns")}
            className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition"
          >
            <div className="text-lg font-bold text-white">Active Users</div>
            <div className="mt-1 text-3xl font-bold text-blue-400 group-hover:text-blue-300">
              {loading ? "..." : stats.interns}
            </div>
          </button>

          <button
            onClick={() => navigate("/groups")}
            className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition"
          >
            <div className="text-lg font-bold text-white">Groups</div>
            <div className="mt-1 text-3xl font-bold text-blue-400 group-hover:text-blue-300">
              {loading ? "..." : stats.groups}
            </div>
          </button>

          <button
            onClick={() => navigate("/intern-activity")}
            className="group rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 text-left hover:border-blue-500/40 transition"
          >
            <div className="text-lg font-bold text-white">Intern Activity</div>
            <div className="mt-1 text-2xl font-bold text-amber-400 group-hover:text-amber-300">
              View
            </div>
          </button>

          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4 hidden xl:block">
            <div className="text-lg font-bold text-white">Status</div>
            <div className="mt-1 text-2xl font-bold text-indigo-300">
              Beta Version
            </div>
          </div>
        </div>

        {/* Charts - Responsive layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
            <h2 className="text-lg font-semibold mb-4">Projects Progress</h2>
            <div className="h-[320px] min-w-0"> {/* Added min-w-0 for chart responsiveness */}
              {projectsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={projectsData} 
                    barSize={38}
                    margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      interval={0}
                      height={60}
                      angle={projectsData.length > 3 ? -10 : 0}
                      textAnchor="end"
                    />
                    <YAxis
                      tick={{ fill: "#9CA3AF" }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(59,130,246,0.08)" }}
                      contentStyle={{
                        background: "#0F172A",
                        border: "1px solid #1E3A8A",
                      }}
                      labelStyle={{ color: "#E5E7EB" }}
                      itemStyle={{ color: "#FFFFFF" }}
                      formatter={(value) => [`${value}%`, "Progress"]}
                    />
                    <Bar
                      dataKey="progress"
                      radius={[6, 6, 0, 0]}
                      onClick={(data) => navigate(`/projects/${data._id}`)}
                      className="cursor-pointer"
                    >
                      {projectsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.progress < 30
                              ? "#F87171"
                              : entry.progress < 70
                              ? "#FBBF24"
                              : "#34D399"
                          }
                        />
                      ))}
                      <LabelList
                        dataKey="progress"
                        position="top"
                        fill="#FFFFFF"
                        formatter={(v) => `${v}%`}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {loading
                    ? "Loading projects..."
                    : "No project data available"}
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
            <h2 className="text-lg font-semibold mb-4">Interns by Branch</h2>
            <div className="h-[320px] min-w-0">
              {internsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={internsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                      onMouseLeave={() => setActiveIndex(0)}
                      animationDuration={300}
                      animationEasing="ease-out"
                    >
                      {internsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="outside"
                        fill="#ffffff"
                        formatter={(value) => `${value}`}
                      />
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} interns`, name]}
                      cursor={false}
                      contentStyle={{
                        background: "#0F172A",
                        border: "1px solid #1E3A8A",
                      }}
                      labelStyle={{ color: "#E5E7EB" }}
                      itemStyle={{ color: "#FFFFFF" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {loading
                    ? "Loading interns data..."
                    : "No interns data available"}
                </div>
              )}
            </div>
            {/* Legend for Pie Chart */}
            {internsData.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {internsData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-1" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs text-gray-300">{entry.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects Table - Responsive with horizontal scroll on small screens */}
        <div className="mt-8 rounded-xl bg-[#111A2E] border border-blue-900/30 p-4">
          <h2 className="text-lg font-semibold mb-4">Projects Overview</h2>
          <div className="overflow-x-auto">
            {projectsData.length > 0 ? (
              <table className="w-full text-left text-gray-300 min-w-[600px]"> {/* Added min-width */}
                <thead className="bg-[#1E293B] text-gray-200">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2 hidden sm:table-cell">
                      Description
                    </th>
                    <th className="px-4 py-2">Deadline</th>
                    <th className="px-4 py-2">Progress</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((p) => (
                    <tr
                      key={p._id}
                      className="border-b border-blue-900/30 hover:bg-[#1E293B]/50"
                    >
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2 hidden sm:table-cell">
                        <div className="truncate max-w-xs">{p.description}</div>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(p.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <ProgressButton
                          projectId={p._id}
                          currentProgress={p.progress}
                          onUpdate={handleUpdateProgress}
                        />
                      </td>
                      <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/projects`)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-4 text-center text-gray-400">
                {loading ? "Loading projects..." : "No projects found"}
              </div>
            )}
          </div>

          {/* Add Project - Responsive grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="col-span-1 sm:col-span-2">
              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                className="w-full rounded bg-[#0F172A] border border-blue-900/30 px-3 py-2"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <input
                type="text"
                placeholder="Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="w-full rounded bg-[#0F172A] border border-blue-900/30 px-3 py-2"
              />
            </div>
            <div className="col-span-1">
              <input
                type="date"
                value={newProject.deadline}
                onChange={(e) =>
                  setNewProject({ ...newProject, deadline: e.target.value })
                }
                className="w-full rounded bg-[#0F172A] border border-blue-900/30 px-3 py-2"
                required
              />
            </div>
            <div className="col-span-1 flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    progress: parseInt(e.target.value),
                  })
                }
                className="flex-1"
              />
              <span className="w-12 text-center">{newProject.progress}%</span>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <button
                onClick={handleAddProject}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Project"}
              </button>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-10 rounded-xl bg-[#111A2E] border border-blue-900/30 p-6">
          <h2 className="text-lg font-semibold mb-4">Company Achievements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>
              Managed {loading ? "..." : stats.interns} interns across{" "}
              {loading ? "..." : internsData.length} departments
            </li>
            <li>
              Completed {loading ? "..." : stats.projects} projects successfully
            </li>
            <li>
              Organized interns into {loading ? "..." : stats.groups} working groups
            </li>
          </ul>
          <button
            onClick={() => navigate("/achievements")}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
          >
            See More Achievements
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}