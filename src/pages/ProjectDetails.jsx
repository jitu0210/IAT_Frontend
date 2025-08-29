import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [selected, setSelected] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statuses, setStatuses] = useState({});
  const [targetDates, setTargetDates] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Define all checkpoints with their default values (same as before)
  const defaultCheckpoints = [
    // Project Initiation and Planning (9 checkpoints)
    {
      id: 1,
      label: "Bid Award & Contract Review",
      value: 100 / 42, // Equal distribution of progress
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 2,
      label: "Project Kick-off Meeting",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 3,
      label: "Define Project Scope & Objectives",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 4,
      label: "Stakeholder Identification & Analysis",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 5,
      label: "Requirements Gathering & Analysis",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 6,
      label: "Feasibility Study & Risk Assessment",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 7,
      label: "Resource Planning",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 8,
      label: "Budget Allocation & Financial Planning",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },
    {
      id: 9,
      label: "Project Management Plan Development",
      value: 100 / 42,
      section: "Project Initiation and Planning",
      status: "not started",
    },

    // Preliminary Design & Concept Development (4 checkpoints)
    {
      id: 10,
      label: "Detailed Requirements Specification for Testing Unit",
      value: 100 / 42,
      section: "Preliminary Design & Concept Development",
      status: "not started",
    },
    {
      id: 11,
      label: "Concept Design & Development",
      value: 100 / 42,
      section: "Preliminary Design & Concept Development",
      status: "not started",
    },
    {
      id: 12,
      label: "Preliminary Design Review (PDR) Preparation",
      value: 100 / 42,
      section: "Preliminary Design & Concept Development",
      status: "not started",
    },
    {
      id: 13,
      label: "PDR Presentation & Approval",
      value: 100 / 42,
      section: "Preliminary Design & Concept Development",
      status: "not started",
    },

    // Detailed Design & Engineering (5 checkpoints)
    {
      id: 14,
      label: "System Level Design",
      value: 100 / 42,
      section: "Detailed Design & Engineering",
      status: "not started",
    },
    {
      id: 15,
      label: "Sub-System Detailed Design",
      value: 100 / 42,
      section: "Detailed Design & Engineering",
      status: "not started",
    },
    {
      id: 16,
      label: "Component Selection & Sourcing Strategy",
      value: 100 / 42,
      section: "Detailed Design & Engineering",
      status: "not started",
    },
    {
      id: 17,
      label: "Drawings & Documentation Package Development",
      value: 100 / 42,
      section: "Detailed Design & Engineering",
      status: "not started",
    },
    {
      id: 18,
      label: "Design Validation & Simulation",
      value: 100 / 42,
      section: "Detailed Design & Engineering",
      status: "not started",
    },

    // Procurement & Manufacturing (4 checkpoints)
    {
      id: 19,
      label: "Bill of Material (BOM) Finalization",
      value: 100 / 42,
      section: "Procurement & Manufacturing",
      status: "not started",
    },
    {
      id: 20,
      label: "Purchase Order (PO) Issuance & Tracking",
      value: 100 / 42,
      section: "Procurement & Manufacturing",
      status: "not started",
    },
    {
      id: 21,
      label: "Component Manufacturing & Assembly",
      value: 100 / 42,
      section: "Procurement & Manufacturing",
      status: "not started",
    },
    {
      id: 22,
      label: "Quality Control & Inspection of Manufactured Parts",
      value: 100 / 42,
      section: "Procurement & Manufacturing",
      status: "not started",
    },

    // Assembly & Integration (5 checkpoints)
    {
      id: 23,
      label: "Assembly & Integration",
      value: 100 / 42,
      section: "Assembly & Integration",
      status: "not started",
    },
    {
      id: 24,
      label: "Sub-system Assembly",
      value: 100 / 42,
      section: "Assembly & Integration",
      status: "not started",
    },
    {
      id: 25,
      label: "Integration of Sub-systems into Main Testing Unit",
      value: 100 / 42,
      section: "Assembly & Integration",
      status: "not started",
    },
    {
      id: 26,
      label: "Cabling & Wiring Installation",
      value: 100 / 42,
      section: "Assembly & Integration",
      status: "not started",
    },
    {
      id: 27,
      label: "Initial Power-up & Basic Functionality Tests",
      value: 100 / 42,
      section: "Assembly & Integration",
      status: "not started",
    },

    // Testing & Validation (7 checkpoints)
    {
      id: 28,
      label: "Factory Acceptance Test (FAT) Plan Development",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },
    {
      id: 29,
      label: "FAT Execution",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },
    {
      id: 30,
      label: "Defect Identification & Resolution",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },
    {
      id: 31,
      label: "Client/User Acceptance Test (UAT) Plan Development",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },
    {
      id: 32,
      label: "UAT Execution",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },
    {
      id: 33,
      label: "Performance & Safety Compliance Testing",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },
    {
      id: 34,
      label: "Test Report Generation & Review",
      value: 100 / 42,
      section: "Testing & Validation",
      status: "not started",
    },

    // Deployment & Training (5 checkpoints)
    {
      id: 35,
      label: "Packaging & Transportation of Testing Unit",
      value: 100 / 42,
      section: "Deployment & Training",
      status: "not started",
    },
    {
      id: 36,
      label: "On-site Installation & Setup",
      value: 100 / 42,
      section: "Deployment & Training",
      status: "not started",
    },
    {
      id: 37,
      label: "Site Acceptance Test (SAT) Execution",
      value: 100 / 42,
      section: "Deployment & Training",
      status: "not started",
    },
    {
      id: 38,
      label: "Operational Training for End-Users",
      value: 100 / 42,
      section: "Deployment & Training",
      status: "not started",
    },
    {
      id: 39,
      label: "Maintenance Training for Technical Staff",
      value: 100 / 42,
      section: "Deployment & Training",
      status: "not started",
    },

    // Project Closure & Post-Deployment (3 checkpoints)
    {
      id: 40,
      label: "Final Documentation Handover",
      value: 100 / 42,
      section: "Project Closure & Post-Deployment",
      status: "not started",
    },
    {
      id: 41,
      label: "Warranty & Support Agreement Finalization",
      value: 100 / 42,
      section: "Project Closure & Post-Deployment",
      status: "not started",
    },
    {
      id: 42,
      label: "Final Project Report & Financial Closure",
      value: 100 / 42,
      section: "Project Closure & Post-Deployment",
      status: "not started",
    },
  ];

  // Fetch project data from backend
  useEffect(() => {
    // In your useEffect where you fetch the project
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}`
        );
        const projectData = response.data;

        setProject(projectData);

        // Initialize selected checkpoints based on status
        const completedCheckpoints = projectData.checkpoints
          ? projectData.checkpoints
              .filter((cp) => cp.status === "completed")
              .map((cp) => cp._id) // Use _id instead of id
          : [];

        setSelected(completedCheckpoints);

        // Initialize statuses and target dates
        const initialStatuses = {};
        const initialTargetDates = {};
        const initialExpandedSections = {};

        projectData.checkpoints.forEach((cp) => {
          initialStatuses[cp._id] = cp.status || "not started";
          initialTargetDates[cp._id] = cp.targetDate
            ? new Date(cp.targetDate)
            : new Date();

          // Initialize all sections as expanded
          if (!initialExpandedSections[cp.section]) {
            initialExpandedSections[cp.section] = true;
          }
        });

        setStatuses(initialStatuses);
        setTargetDates(initialTargetDates);
        setExpandedSections(initialExpandedSections);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details");
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleToggle = async (id) => {
    try {
      let newStatus;
      let newSelected;

      if (selected.includes(id)) {
        newSelected = selected.filter((x) => x !== id);
        newStatus = "not started";
      } else {
        newSelected = [...selected, id];
        newStatus = "completed";
      }

      setSelected(newSelected);
      setStatuses((prev) => ({ ...prev, [id]: newStatus }));

      // Update checkpoint on backend
      await axios.patch(
        `https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}/checkpoints/${id}`,
        { status: newStatus }
      );

      // Recalculate progress
      const progress = calculateProgress(newSelected);
      setProject((prev) => ({ ...prev, progress }));
    } catch (err) {
      console.error("Error updating checkpoint:", err);
      setError("Failed to update checkpoint");
    }
  };

  const calculateProgress = (selectedCheckpoints) => {
    // Use project checkpoints if available, otherwise use default checkpoints
    const checkpointsToUse = project?.checkpoints || defaultCheckpoints;

    const totalValue = checkpointsToUse.reduce((sum, cp) => sum + cp.value, 0);

    const completedValue = checkpointsToUse
      .filter((cp) => selectedCheckpoints.includes(cp._id || cp.id))
      .reduce((sum, cp) => sum + cp.value, 0);

    return (completedValue / totalValue) * 100;
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setStatuses((prev) => ({ ...prev, [id]: newStatus }));

      // Update selected array based on status change
      if (newStatus === "completed" && !selected.includes(id)) {
        setSelected([...selected, id]);
      } else if (newStatus !== "completed" && selected.includes(id)) {
        setSelected(selected.filter((x) => x !== id));
      }

      // Update checkpoint on backend
      await axios.patch(
        `https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}/checkpoints/${id}`,
        { status: newStatus }
      );

      // Recalculate progress
      const newSelected =
        newStatus === "completed"
          ? [...selected, id]
          : selected.filter((x) => x !== id);

      const progress = calculateProgress(newSelected);
      setProject((prev) => ({ ...prev, progress }));
    } catch (err) {
      console.error("Error updating checkpoint status:", err);
      setError("Failed to update checkpoint status");
    }
  };

  const handleDateChange = async (id, date) => {
    try {
      setTargetDates((prev) => ({ ...prev, [id]: date }));

      // Update checkpoint on backend
      await axios.patch(
        `https://iat-backend-5h88.onrender.com/api/v1/projects/${projectId}/checkpoints/${id}`,
        { targetDate: date }
      );
    } catch (err) {
      console.error("Error updating checkpoint date:", err);
      setError("Failed to update target date");
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Project not found"}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const progress = project.progress || 0;

  // Use project checkpoints if available, otherwise use default checkpoints
  const allCheckpoints = project.checkpoints || defaultCheckpoints;

  const completedTasks = allCheckpoints.filter((p) =>
    selected.includes(p._id || p.id)
  );
  const remainingTasks = allCheckpoints.filter(
    (p) => !selected.includes(p._id || p.id)
  );

  // Group checkpoints by section
  const checkpointsBySection = allCheckpoints.reduce((acc, cp) => {
    if (!acc[cp.section]) {
      acc[cp.section] = [];
    }
    acc[cp.section].push(cp);
    return acc;
  }, {});

  // Calculate time until deadline
  const deadlineDate = new Date(project.deadline);
  const timeDiff = deadlineDate - currentTime;

  const daysUntilDeadline = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const hoursUntilDeadline = Math.ceil(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesUntilDeadline = Math.ceil(
    (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Determine progress bar color
  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500";
    if (progress < 65) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Determine deadline urgency
  const getDeadlineUrgency = () => {
    if (daysUntilDeadline < 0) return "text-red-400";
    if (daysUntilDeadline < 7) return "text-red-400";
    if (daysUntilDeadline < 30) return "text-yellow-400";
    return "text-green-400";
  };

  // Format time remaining
  const formatTimeRemaining = () => {
    if (daysUntilDeadline < 0) {
      return `Deadline passed ${Math.abs(daysUntilDeadline)} days ago`;
    }

    if (daysUntilDeadline === 0) {
      return `${hoursUntilDeadline} hours, ${minutesUntilDeadline} minutes remaining`;
    }

    return `${daysUntilDeadline} days, ${hoursUntilDeadline} hours remaining`;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "at risk":
        return "text-red-400";
      case "in progress":
        return "text-yellow-400";
      case "on schedule":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  // Get status background color
  const getStatusBgColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-900/30 border-green-700";
      case "at risk":
        return "bg-red-900/30 border-red-700";
      case "in progress":
        return "bg-yellow-900/30 border-yellow-700";
      case "on schedule":
        return "bg-blue-900/30 border-blue-700";
      default:
        return "bg-gray-900/30 border-gray-700";
    }
  };

  // Get border color based on status
  const getBorderColor = (status) => {
    switch (status) {
      case "completed":
        return "border-green-700";
      case "at risk":
        return "border-red-700";
      case "in progress":
        return "border-yellow-700";
      case "on schedule":
        return "border-blue-700";
      default:
        return "border-gray-700";
    }
  };

  // Calculate days until target date for a checkpoint
  const getDaysUntilTarget = (targetDate) => {
    const today = new Date();
    const timeDiff = targetDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Get date urgency color
  const getDateUrgencyColor = (days) => {
    if (days < 0) return "text-red-400";
    if (days < 3) return "text-red-400";
    if (days < 7) return "text-yellow-400";
    return "text-green-400";
  };

  // Format date as d-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Project Header */}
        <div className="mb-8 bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {project.name}
              </h1>
              <p className="text-gray-300 mb-4 max-w-3xl">
                {project.description}
              </p>
            </div>
            <div className="bg-blue-900/30 px-4 py-3 rounded-lg border border-blue-700 min-w-[180px]">
              <p className="text-sm text-blue-300">Project Deadline</p>
              <p className="font-semibold">
                {formatDate(new Date(project.deadline))}
              </p>
              <p className={`text-xs mt-1 ${getDeadlineUrgency()}`}>
                {formatTimeRemaining()}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8 bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-300">
              Project Progress
            </h2>
            <span className="text-lg font-bold">{Math.round(progress)}%</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
            <div
              className={`${getProgressColor()} h-4 rounded-full transition-all duration-700`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-xl p-5 border border-green-700/50">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-2">
                  <span className="text-green-400">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-green-400">
                  Completed ({completedTasks.length})
                </h3>
              </div>
              {completedTasks.length > 0 ? (
                <ul className="text-gray-300 text-sm space-y-2 max-h-40 overflow-y-auto pr-2">
                  {completedTasks.map((t) => (
                    <li key={t._id || t.id} className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span className="text-sm">{t.label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No tasks completed yet</p>
              )}
            </div>

            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-xl p-5 border border-yellow-700/50">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-yellow-900/50 flex items-center justify-center mr-2">
                  <span className="text-yellow-400">!</span>
                </div>
                <h3 className="text-lg font-semibold text-yellow-400">
                  Project Status
                </h3>
              </div>
              <div className="text-gray-300 text-sm">
                {progress < 30 ? (
                  <div>
                    <p className="font-medium text-red-400 mb-2">
                      🚨 Project At Risk
                    </p>
                    <p>
                      You're behind schedule. Focus on completing the upcoming
                      milestones.
                    </p>
                    <div className="mt-3 bg-red-900/30 p-2 rounded text-xs">
                      Consider reallocating resources to critical path tasks
                    </div>
                  </div>
                ) : progress < 65 ? (
                  <div>
                    <p className="font-medium text-yellow-400 mb-2">
                      ⚡ On Track
                    </p>
                    <p>Good progress so far. Keep up the momentum!</p>
                    <div className="mt-3 bg-yellow-900/30 p-2 rounded text-xs">
                      {remainingTasks.length} tasks remaining
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-green-400 mb-2">
                      ✅ Ahead of Schedule
                    </p>
                    <p>
                      Excellent progress! You're on track to meet the deadline.
                    </p>
                    <div className="mt-3 bg-green-900/30 p-2 rounded text-xs">
                      {remainingTasks.length} tasks until completion
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-xl p-5 border border-red-700/50">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center mr-2">
                  <span className="text-red-400">!</span>
                </div>
                <h3 className="text-lg font-semibold text-red-400">
                  Remaining ({remainingTasks.length})
                </h3>
              </div>
              {remainingTasks.length > 0 ? (
                <ul className="text-gray-300 text-sm space-y-2 max-h-40 overflow-y-auto pr-2">
                  {remainingTasks.map((t) => (
                    <li key={t._id || t.id} className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span className="text-sm">{t.label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  All checkpoints completed 🎉
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Checkpoints Section */}
        <div className="bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-300">
              Project Checkpoints
            </h2>
            <span className="text-sm text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
              {completedTasks.length}/{allCheckpoints.length} completed
            </span>
          </div>

          {/* Group checkpoints by section */}
          {Object.entries(checkpointsBySection).map(
            ([section, checkpoints]) => (
              <div key={section} className="mb-8 last:mb-0">
                <div
                  className="flex items-center justify-between cursor-pointer mb-4 border-b border-blue-800 pb-2"
                  onClick={() => toggleSection(section)}
                >
                  <h3 className="text-lg font-semibold text-blue-300">
                    {section}
                  </h3>
                  <span className="text-blue-400">
                    {expandedSections[section] ? "▲" : "▼"}
                  </span>
                </div>

                {expandedSections[section] && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {checkpoints.map((cp) => {
                      const cpId = cp._id || cp.id;
                      const currentStatus = statuses[cpId] || "not started";
                      const targetDate = targetDates[cpId] || new Date();
                      const daysUntilTarget = getDaysUntilTarget(targetDate);

                      return (
                        <div
                          key={cpId}
                          className={`flex flex-col p-4 rounded-xl border transition-all duration-300 ${getBorderColor(
                            currentStatus
                          )} ${
                            selected.includes(cpId)
                              ? "bg-blue-900/30 shadow-lg scale-[1.02]"
                              : "bg-gradient-to-b from-gray-800/50 to-gray-900/70 hover:bg-gray-700/50"
                          }`}
                        >
                          <div className="flex items-start mb-2">
                            <input
                              type="checkbox"
                              checked={selected.includes(cpId)}
                              onChange={() => handleToggle(cpId)}
                              className="w-5 h-5 accent-blue-500 mt-0.5 flex-shrink-0 mr-3 cursor-pointer"
                            />
                            <div className="flex-1">
                              <span className="text-gray-200 text-sm block mb-1">
                                {cp.label}
                              </span>
                              <span className="text-blue-400 text-xs">
                                +{Math.round(cp.value * 10) / 10}% completion
                              </span>
                            </div>
                          </div>

                          {/* Status indicator */}
                          <div
                            className={`mt-2 text-xs px-2 py-1 rounded-full w-fit ${getStatusBgColor(
                              currentStatus
                            )} ${getStatusColor(currentStatus)}`}
                          >
                            {currentStatus.replace("_", " ")}
                          </div>

                          {/* Target date picker */}
                          <div className="mt-3">
                            <label className="text-xs text-gray-400 block mb-1">
                              Target Date:
                            </label>
                            <DatePicker
                              selected={targetDate}
                              onChange={(date) => handleDateChange(cpId, date)}
                              className="text-xs p-1 rounded w-full bg-gray-700 border border-gray-600 text-white"
                              dateFormat="dd-MM-yyyy"
                              customInput={
                                <input
                                  type="text"
                                  className="text-xs p-1 rounded w-full bg-gray-700 border border-gray-600 text-white"
                                  value={
                                    targetDate
                                      ? format(targetDate, "dd-MM-yyyy")
                                      : "dd-mm-yyyy"
                                  }
                                  readOnly
                                />
                              }
                              placeholderText="dd-mm-yyyy"
                            />
                            <div
                              className={`text-xs mt-1 ${getDateUrgencyColor(
                                daysUntilTarget
                              )}`}
                            >
                              {targetDate
                                ? daysUntilTarget < 0
                                  ? `${Math.abs(daysUntilTarget)} days overdue`
                                  : `${daysUntilTarget} days remaining`
                                : "No target date set"}
                            </div>
                          </div>

                          {/* Status dropdown */}
                          <div className="mt-2">
                            <label className="text-xs text-gray-400 block mb-1">
                              Update Status:
                            </label>
                            <select
                              value={currentStatus}
                              onChange={(e) =>
                                handleStatusChange(cpId, e.target.value)
                              }
                              className={`text-xs p-1 rounded w-full bg-gray-700 border ${getBorderColor(
                                currentStatus
                              )} ${getStatusColor(currentStatus)}`}
                            >
                              <option
                                value="not started"
                                className="text-gray-400"
                              >
                                Not Started
                              </option>
                              <option
                                value="on schedule"
                                className="text-blue-400"
                              >
                                On Schedule
                              </option>
                              <option
                                value="in progress"
                                className="text-yellow-400"
                              >
                                In Progress
                              </option>
                              <option value="at risk" className="text-red-400">
                                At Risk
                              </option>
                              <option
                                value="completed"
                                className="text-green-400"
                              >
                                Completed
                              </option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import "react-datepicker/dist/react-datepicker.css";

// export default function ProjectDetail() {
//   // Calculate equal percentage values for sections and checkpoints
//   const totalSections = 8; // Number of sections
//   const sectionPercentage = 100 / totalSections;

//   const project = {
//     name: "AI Accident Detection System",
//     description:
//       "This project integrates IoT sensors and AI algorithms to detect accidents in real-time and notify emergency services immediately.",
//     deadline: "2025-12-31",
//     checkpoints: [
//       // Project Initiation and Planning (9 checkpoints)
//       {
//         id: 1,
//         label: "Bid Award & Contract Review",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 2,
//         label: "Project Kick-off Meeting",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 3,
//         label: "Define Project Scope & Objectives",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 4,
//         label: "Stakeholder Identification & Analysis",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 5,
//         label: "Requirements Gathering & Analysis",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 6,
//         label: "Feasibility Study & Risk Assessment",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 7,
//         label: "Resource Planning",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 8,
//         label: "Budget Allocation & Financial Planning",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },
//       {
//         id: 9,
//         label: "Project Management Plan Development",
//         value: sectionPercentage / 9,
//         section: "Project Initiation and Planning",
//         status: "not started",
//       },

//       // Preliminary Design & Concept Development (4 checkpoints)
//       {
//         id: 10,
//         label: "Detailed Requirements Specification for Testing Unit",
//         value: sectionPercentage / 4,
//         section: "Preliminary Design & Concept Development",
//         status: "not started",
//       },
//       {
//         id: 11,
//         label: "Concept Design & Development",
//         value: sectionPercentage / 4,
//         section: "Preliminary Design & Concept Development",
//         status: "not started",
//       },
//       {
//         id: 12,
//         label: "Preliminary Design Review (PDR) Preparation",
//         value: sectionPercentage / 4,
//         section: "Preliminary Design & Concept Development",
//         status: "not started",
//       },
//       {
//         id: 13,
//         label: "PDR Presentation & Approval",
//         value: sectionPercentage / 4,
//         section: "Preliminary Design & Concept Development",
//         status: "not started",
//       },

//       // Detailed Design & Engineering (5 checkpoints)
//       {
//         id: 14,
//         label: "System Level Design",
//         value: sectionPercentage / 5,
//         section: "Detailed Design & Engineering",
//         status: "not started",
//       },
//       {
//         id: 15,
//         label: "Sub-System Detailed Design",
//         value: sectionPercentage / 5,
//         section: "Detailed Design & Engineering",
//         status: "not started",
//       },
//       {
//         id: 16,
//         label: "Component Selection & Sourcing Strategy",
//         value: sectionPercentage / 5,
//         section: "Detailed Design & Engineering",
//         status: "not started",
//       },
//       {
//         id: 17,
//         label: "Drawings & Documentation Package Development",
//         value: sectionPercentage / 5,
//         section: "Detailed Design & Engineering",
//         status: "not started",
//       },
//       {
//         id: 18,
//         label: "Design Validation & Simulation",
//         value: sectionPercentage / 5,
//         section: "Detailed Design & Engineering",
//         status: "not started",
//       },

//       // Procurement & Manufacturing (4 checkpoints)
//       {
//         id: 19,
//         label: "Bill of Material (BOM) Finalization",
//         value: sectionPercentage / 4,
//         section: "Procurement & Manufacturing",
//         status: "not started",
//       },
//       {
//         id: 20,
//         label: "Purchase Order (PO) Issuance & Tracking",
//         value: sectionPercentage / 4,
//         section: "Procurement & Manufacturing",
//         status: "not started",
//       },
//       {
//         id: 21,
//         label: "Component Manufacturing & Assembly",
//         value: sectionPercentage / 4,
//         section: "Procurement & Manufacturing",
//         status: "not started",
//       },
//       {
//         id: 22,
//         label: "Quality Control & Inspection of Manufactured Parts",
//         value: sectionPercentage / 4,
//         section: "Procurement & Manufacturing",
//         status: "not started",
//       },

//       // Assembly & Integration (5 checkpoints)
//       {
//         id: 23,
//         label: "Assembly & Integration",
//         value: sectionPercentage / 5,
//         section: "Assembly & Integration",
//         status: "not started",
//       },
//       {
//         id: 24,
//         label: "Sub-system Assembly",
//         value: sectionPercentage / 5,
//         section: "Assembly & Integration",
//         status: "not started",
//       },
//       {
//         id: 25,
//         label: "Integration of Sub-systems into Main Testing Unit",
//         value: sectionPercentage / 5,
//         section: "Assembly & Integration",
//         status: "not started",
//       },
//       {
//         id: 26,
//         label: "Cabling & Wiring Installation",
//         value: sectionPercentage / 5,
//         section: "Assembly & Integration",
//         status: "not started",
//       },
//       {
//         id: 27,
//         label: "Initial Power-up & Basic Functionality Tests",
//         value: sectionPercentage / 5,
//         section: "Assembly & Integration",
//         status: "not started",
//       },

//       // Testing & Validation (7 checkpoints)
//       {
//         id: 28,
//         label: "Factory Acceptance Test (FAT) Plan Development",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },
//       {
//         id: 29,
//         label: "FAT Execution",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },
//       {
//         id: 30,
//         label: "Defect Identification & Resolution",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },
//       {
//         id: 31,
//         label: "Client/User Acceptance Test (UAT) Plan Development",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },
//       {
//         id: 32,
//         label: "UAT Execution",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },
//       {
//         id: 33,
//         label: "Performance & Safety Compliance Testing",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },
//       {
//         id: 34,
//         label: "Test Report Generation & Review",
//         value: sectionPercentage / 7,
//         section: "Testing & Validation",
//         status: "not started",
//       },

//       // Deployment & Training (5 checkpoints)
//       {
//         id: 35,
//         label: "Packaging & Transportation of Testing Unit",
//         value: sectionPercentage / 5,
//         section: "Deployment & Training",
//         status: "not started",
//       },
//       {
//         id: 36,
//         label: "On-site Installation & Setup",
//         value: sectionPercentage / 5,
//         section: "Deployment & Training",
//         status: "not started",
//       },
//       {
//         id: 37,
//         label: "Site Acceptance Test (SAT) Execution",
//         value: sectionPercentage / 5,
//         section: "Deployment & Training",
//         status: "not started",
//       },
//       {
//         id: 38,
//         label: "Operational Training for End-Users",
//         value: sectionPercentage / 5,
//         section: "Deployment & Training",
//         status: "not started",
//       },
//       {
//         id: 39,
//         label: "Maintenance Training for Technical Staff",
//         value: sectionPercentage / 5,
//         section: "Deployment & Training",
//         status: "not started",
//       },

//       // Project Closure & Post-Deployment (3 checkpoints)
//       {
//         id: 40,
//         label: "Final Documentation Handover",
//         value: sectionPercentage / 3,
//         section: "Project Closure & Post-Deployment",
//         status: "not started",
//       },
//       {
//         id: 41,
//         label: "Warranty & Support Agreement Finalization",
//         value: sectionPercentage / 3,
//         section: "Project Closure & Post-Deployment",
//         status: "not started",
//       },
//       {
//         id: 42,
//         label: "Final Project Report & Financial Closure",
//         value: sectionPercentage / 3,
//         section: "Project Closure & Post-Deployment",
//         status: "not started",
//       },
//     ],
//   };

//   const [selected, setSelected] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [statuses, setStatuses] = useState({});
//   const [targetDates, setTargetDates] = useState({});
//   const [expandedSections, setExpandedSections] = useState({});

//   // Update current time every minute
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     // Initialize statuses
//     const initialStatuses = {};
//     const initialTargetDates = {};
//     const initialExpandedSections = {};

//     project.checkpoints.forEach((cp) => {
//       initialStatuses[cp.id] = cp.status;
//       // Set default target date to 30 days from now for each checkpoint
//       const defaultDate = new Date();
//       defaultDate.setDate(defaultDate.getDate() + 30);
//       initialTargetDates[cp.id] = defaultDate;

//       // Initialize all sections as expanded
//       if (!initialExpandedSections[cp.section]) {
//         initialExpandedSections[cp.section] = true;
//       }
//     });

//     setStatuses(initialStatuses);
//     setTargetDates(initialTargetDates);
//     setExpandedSections(initialExpandedSections);

//     return () => clearInterval(timer);
//   }, []);

//   const handleToggle = (id) => {
//     if (selected.includes(id)) {
//       setSelected(selected.filter((x) => x !== id));
//       // When unchecking, set status back to "not started"
//       setStatuses((prev) => ({
//         ...prev,
//         [id]: "not started",
//       }));
//     } else {
//       setSelected([...selected, id]);
//       // When checking, automatically set status to "completed"
//       setStatuses((prev) => ({
//         ...prev,
//         [id]: "completed",
//       }));
//     }
//   };

//   const handleStatusChange = (id, newStatus) => {
//     setStatuses((prev) => ({
//       ...prev,
//       [id]: newStatus,
//     }));

//     // If status is changed to "completed", automatically check the checkbox
//     if (newStatus === "completed" && !selected.includes(id)) {
//       setSelected([...selected, id]);
//     }

//     // If status is changed from "completed" to something else, uncheck the checkbox
//     if (newStatus !== "completed" && selected.includes(id)) {
//       setSelected(selected.filter((x) => x !== id));
//     }
//   };

//   const handleDateChange = (id, date) => {
//     setTargetDates((prev) => ({
//       ...prev,
//       [id]: date,
//     }));
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const progress = project.checkpoints
//     .filter((p) => selected.includes(p.id))
//     .reduce((sum, p) => sum + p.value, 0);

//   const completedTasks = project.checkpoints.filter((p) =>
//     selected.includes(p.id)
//   );
//   const remainingTasks = project.checkpoints.filter(
//     (p) => !selected.includes(p.id)
//   );

//   // Group checkpoints by section
//   const checkpointsBySection = project.checkpoints.reduce((acc, cp) => {
//     if (!acc[cp.section]) {
//       acc[cp.section] = [];
//     }
//     acc[cp.section].push(cp);
//     return acc;
//   }, {});

//   // Calculate time until deadline
//   const deadlineDate = new Date(project.deadline);
//   const timeDiff = deadlineDate - currentTime;

//   const daysUntilDeadline = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//   const hoursUntilDeadline = Math.ceil(
//     (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutesUntilDeadline = Math.ceil(
//     (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
//   );

//   // Determine progress bar color
//   const getProgressColor = () => {
//     if (progress < 30) return "bg-red-500";
//     if (progress < 65) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   // Determine deadline urgency
//   const getDeadlineUrgency = () => {
//     if (daysUntilDeadline < 0) return "text-red-400";
//     if (daysUntilDeadline < 7) return "text-red-400";
//     if (daysUntilDeadline < 30) return "text-yellow-400";
//     return "text-green-400";
//   };

//   // Format time remaining
//   const formatTimeRemaining = () => {
//     if (daysUntilDeadline < 0) {
//       return `Deadline passed ${Math.abs(daysUntilDeadline)} days ago`;
//     }

//     if (daysUntilDeadline === 0) {
//       return `${hoursUntilDeadline} hours, ${minutesUntilDeadline} minutes remaining`;
//     }

//     return `${daysUntilDeadline} days, ${hoursUntilDeadline} hours remaining`;
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "text-green-400";
//       case "at risk":
//         return "text-red-400";
//       case "in progress":
//         return "text-yellow-400";
//       case "on schedule":
//         return "text-blue-400";
//       default:
//         return "text-gray-400";
//     }
//   };

//   // Get status background color
//   const getStatusBgColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-900/30 border-green-700";
//       case "at risk":
//         return "bg-red-900/30 border-red-700";
//       case "in progress":
//         return "bg-yellow-900/30 border-yellow-700";
//       case "on schedule":
//         return "bg-blue-900/30 border-blue-700";
//       default:
//         return "bg-gray-900/30 border-gray-700";
//     }
//   };

//   // Get border color based on status
//   const getBorderColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "border-green-700";
//       case "at risk":
//         return "border-red-700";
//       case "in progress":
//         return "border-yellow-700";
//       case "on schedule":
//         return "border-blue-700";
//       default:
//         return "border-gray-700";
//     }
//   };

//   // Calculate days until target date for a checkpoint
//   const getDaysUntilTarget = (targetDate) => {
//     const today = new Date();
//     const timeDiff = targetDate - today;
//     return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//   };

//   // Get date urgency color
//   const getDateUrgencyColor = (days) => {
//     if (days < 0) return "text-red-400";
//     if (days < 3) return "text-red-400";
//     if (days < 7) return "text-yellow-400";
//     return "text-green-400";
//   };

//   // Format date as d-mm-yyyy
//   const formatDate = (date) => {
//     if (!date) return "";
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   return (
//     <div className="min-h-screen bg-[#0B1220] text-white">
//       <Header />

//       <main className="container mx-auto px-4 py-8 max-w-6xl">
//         {/* Project Header */}
//         <div className="mb-8 bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
//                 {project.name}
//               </h1>
//               <p className="text-gray-300 mb-4 max-w-3xl">
//                 {project.description}
//               </p>
//             </div>
//             <div className="bg-blue-900/30 px-4 py-3 rounded-lg border border-blue-700 min-w-[180px]">
//               <p className="text-sm text-blue-300">Project Deadline</p>
//               <p className="font-semibold">
//                 {formatDate(new Date(project.deadline))}
//               </p>
//               <p className={`text-xs mt-1 ${getDeadlineUrgency()}`}>
//                 {formatTimeRemaining()}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Progress Section */}
//         <div className="mb-8 bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-blue-300">
//               Project Progress
//             </h2>
//             <span className="text-lg font-bold">{Math.round(progress)}%</span>
//           </div>

//           <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
//             <div
//               className={`${getProgressColor()} h-4 rounded-full transition-all duration-700`}
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           {/* Status Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-xl p-5 border border-green-700/50">
//               <div className="flex items-center mb-3">
//                 <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-2">
//                   <span className="text-green-400">✓</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-green-400">
//                   Completed ({completedTasks.length})
//                 </h3>
//               </div>
//               {completedTasks.length > 0 ? (
//                 <ul className="text-gray-300 text-sm space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {completedTasks.map((t) => (
//                     <li key={t.id} className="flex items-start">
//                       <span className="text-green-400 mr-2">•</span>
//                       <span className="text-sm">{t.label}</span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-sm">No tasks completed yet</p>
//               )}
//             </div>

//             <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-xl p-5 border border-yellow-700/50">
//               <div className="flex items-center mb-3">
//                 <div className="w-8 h-8 rounded-full bg-yellow-900/50 flex items-center justify-center mr-2">
//                   <span className="text-yellow-400">!</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-yellow-400">
//                   Project Status
//                 </h3>
//               </div>
//               <div className="text-gray-300 text-sm">
//                 {progress < 30 ? (
//                   <div>
//                     <p className="font-medium text-red-400 mb-2">
//                       🚨 Project At Risk
//                     </p>
//                     <p>
//                       You're behind schedule. Focus on completing the upcoming
//                       milestones.
//                     </p>
//                     <div className="mt-3 bg-red-900/30 p-2 rounded text-xs">
//                       Consider reallocating resources to critical path tasks
//                     </div>
//                   </div>
//                 ) : progress < 65 ? (
//                   <div>
//                     <p className="font-medium text-yellow-400 mb-2">
//                       ⚡ On Track
//                     </p>
//                     <p>Good progress so far. Keep up the momentum!</p>
//                     <div className="mt-3 bg-yellow-900/30 p-2 rounded text-xs">
//                       {remainingTasks.length} tasks remaining
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <p className="font-medium text-green-400 mb-2">
//                       ✅ Ahead of Schedule
//                     </p>
//                     <p>
//                       Excellent progress! You're on track to meet the deadline.
//                     </p>
//                     <div className="mt-3 bg-green-900/30 p-2 rounded text-xs">
//                       {remainingTasks.length} tasks until completion
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-xl p-5 border border-red-700/50">
//               <div className="flex items-center mb-3">
//                 <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center mr-2">
//                   <span className="text-red-400">!</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-red-400">
//                   Remaining ({remainingTasks.length})
//                 </h3>
//               </div>
//               {remainingTasks.length > 0 ? (
//                 <ul className="text-gray-300 text-sm space-y-2 max-h-40 overflow-y-auto pr-2">
//                   {remainingTasks.map((t) => (
//                     <li key={t.id} className="flex items-start">
//                       <span className="text-red-400 mr-2">•</span>
//                       <span className="text-sm">{t.label}</span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-sm">
//                   All checkpoints completed 🎉
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Checkpoints Section */}
//         <div className="bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-blue-300">
//               Project Checkpoints
//             </h2>
//             <span className="text-sm text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
//               {completedTasks.length}/{project.checkpoints.length} completed
//             </span>
//           </div>

//           {/* Group checkpoints by section */}
//           {Object.entries(checkpointsBySection).map(
//             ([section, checkpoints]) => (
//               <div key={section} className="mb-8 last:mb-0">
//                 <div
//                   className="flex items-center justify-between cursor-pointer mb-4 border-b border-blue-800 pb-2"
//                   onClick={() => toggleSection(section)}
//                 >
//                   <h3 className="text-lg font-semibold text-blue-300">
//                     {section}
//                   </h3>
//                   <span className="text-blue-400">
//                     {expandedSections[section] ? "▲" : "▼"}
//                   </span>
//                 </div>

//                 {expandedSections[section] && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {checkpoints.map((cp) => {
//                       const currentStatus = statuses[cp.id] || "not started";
//                       const targetDate = targetDates[cp.id] || new Date();
//                       const daysUntilTarget = getDaysUntilTarget(targetDate);

//                       return (
//                         <div
//                           key={cp.id}
//                           className={`flex flex-col p-4 rounded-xl border transition-all duration-300 ${getBorderColor(
//                             currentStatus
//                           )} ${
//                             selected.includes(cp.id)
//                               ? "bg-blue-900/30 shadow-lg scale-[1.02]"
//                               : "bg-gradient-to-b from-gray-800/50 to-gray-900/70 hover:bg-gray-700/50"
//                           }`}
//                         >
//                           <div className="flex items-start mb-2">
//                             <input
//                               type="checkbox"
//                               checked={selected.includes(cp.id)}
//                               onChange={() => handleToggle(cp.id)}
//                               className="w-5 h-5 accent-blue-500 mt-0.5 flex-shrink-0 mr-3 cursor-pointer"
//                             />
//                             <div className="flex-1">
//                               <span className="text-gray-200 text-sm block mb-1">
//                                 {cp.label}
//                               </span>
//                               <span className="text-blue-400 text-xs">
//                                 +{Math.round(cp.value * 10) / 10}% completion
//                               </span>
//                             </div>
//                           </div>

//                           {/* Status indicator */}
//                           <div
//                             className={`mt-2 text-xs px-2 py-1 rounded-full w-fit ${getStatusBgColor(
//                               currentStatus
//                             )} ${getStatusColor(currentStatus)}`}
//                           >
//                             {currentStatus.replace("_", " ")}
//                           </div>

//                           {/* Target date picker */}
//                           <div className="mt-3">
//                             <label className="text-xs text-gray-400 block mb-1">
//                               Target Date:
//                             </label>
//                             <DatePicker
//                               selected={targetDate}
//                               onChange={(date) => handleDateChange(cp.id, date)}
//                               className="text-xs p-1 rounded w-full bg-gray-700 border border-gray-600 text-white"
//                               dateFormat="dd-MM-yyyy"
//                               customInput={
//                                 <input
//                                   type="text"
//                                   className="text-xs p-1 rounded w-full bg-gray-700 border border-gray-600 text-white"
//                                   value={
//                                     targetDate
//                                       ? format(targetDate, "dd-MM-yyyy")
//                                       : "dd-mm-yyyy"
//                                   }
//                                   readOnly
//                                 />
//                               }
//                               placeholderText="dd-mm-yyyy"
//                             />
//                             <div
//                               className={`text-xs mt-1 ${getDateUrgencyColor(
//                                 daysUntilTarget
//                               )}`}
//                             >
//                               {targetDate
//                                 ? daysUntilTarget < 0
//                                   ? `${Math.abs(daysUntilTarget)} days overdue`
//                                   : `${daysUntilTarget} days remaining`
//                                 : "No target date set"}
//                             </div>
//                           </div>

//                           {/* Status dropdown */}
//                           <div className="mt-2">
//                             <label className="text-xs text-gray-400 block mb-1">
//                               Update Status:
//                             </label>
//                             <select
//                               value={currentStatus}
//                               onChange={(e) =>
//                                 handleStatusChange(cp.id, e.target.value)
//                               }
//                               className={`text-xs p-1 rounded w-full bg-gray-700 border ${getBorderColor(
//                                 currentStatus
//                               )} ${getStatusColor(currentStatus)}`}
//                             >
//                               <option
//                                 value="not started"
//                                 className="text-gray-400"
//                               >
//                                 Not Started
//                               </option>
//                               <option
//                                 value="on schedule"
//                                 className="text-blue-400"
//                               >
//                                 On Schedule
//                               </option>
//                               <option
//                                 value="in progress"
//                                 className="text-yellow-400"
//                               >
//                                 In Progress
//                               </option>
//                               <option value="at risk" className="text-red-400">
//                                 At Risk
//                               </option>
//                               <option
//                                 value="completed"
//                                 className="text-green-400"
//                               >
//                                 Completed
//                               </option>
//                             </select>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
