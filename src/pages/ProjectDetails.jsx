import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProjectDetail() {
  // Calculate equal percentage values for sections and checkpoints
  const totalSections = 8; // Number of sections
  const sectionPercentage = 100 / totalSections;
  
  const project = {
    name: "AI Accident Detection System",
    description:
      "This project integrates IoT sensors and AI algorithms to detect accidents in real-time and notify emergency services immediately.",
    deadline: "2025-12-31",
    checkpoints: [
      // Project Initiation and Planning (9 checkpoints)
      { 
        id: 1, 
        label: "Bid Award & Contract Review", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 2, 
        label: "Project Kick-off Meeting", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 3, 
        label: "Define Project Scope & Objectives", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 4, 
        label: "Stakeholder Identification & Analysis", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 5, 
        label: "Requirements Gathering & Analysis", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 6, 
        label: "Feasibility Study & Risk Assessment", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 7, 
        label: "Resource Planning", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 8, 
        label: "Budget Allocation & Financial Planning", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      { 
        id: 9, 
        label: "Project Management Plan Development", 
        value: sectionPercentage / 9, 
        section: "Project Initiation and Planning",
        status: "not started"
      },
      
      // Preliminary Design & Concept Development (4 checkpoints)
      { 
        id: 10, 
        label: "Detailed Requirements Specification for Testing Unit", 
        value: sectionPercentage / 4, 
        section: "Preliminary Design & Concept Development",
        status: "not started"
      },
      { 
        id: 11, 
        label: "Concept Design & Development", 
        value: sectionPercentage / 4, 
        section: "Preliminary Design & Concept Development",
        status: "not started"
      },
      { 
        id: 12, 
        label: "Preliminary Design Review (PDR) Preparation", 
        value: sectionPercentage / 4, 
        section: "Preliminary Design & Concept Development",
        status: "not started"
      },
      { 
        id: 13, 
        label: "PDR Presentation & Approval", 
        value: sectionPercentage / 4, 
        section: "Preliminary Design & Concept Development",
        status: "not started"
      },
      
      // Detailed Design & Engineering (5 checkpoints)
      { 
        id: 14, 
        label: "System Level Design", 
        value: sectionPercentage / 5, 
        section: "Detailed Design & Engineering",
        status: "not started"
      },
      { 
        id: 15, 
        label: "Sub-System Detailed Design", 
        value: sectionPercentage / 5, 
        section: "Detailed Design & Engineering",
        status: "not started"
      },
      { 
        id: 16, 
        label: "Component Selection & Sourcing Strategy", 
        value: sectionPercentage / 5, 
        section: "Detailed Design & Engineering",
        status: "not started"
      },
      { 
        id: 17, 
        label: "Drawings & Documentation Package Development", 
        value: sectionPercentage / 5, 
        section: "Detailed Design & Engineering",
        status: "not started"
      },
      { 
        id: 18, 
        label: "Design Validation & Simulation", 
        value: sectionPercentage / 5, 
        section: "Detailed Design & Engineering",
        status: "not started"
      },
      
      // Procurement & Manufacturing (4 checkpoints)
      { 
        id: 19, 
        label: "Bill of Material (BOM) Finalization", 
        value: sectionPercentage / 4, 
        section: "Procurement & Manufacturing",
        status: "not started"
      },
      { 
        id: 20, 
        label: "Purchase Order (PO) Issuance & Tracking", 
        value: sectionPercentage / 4, 
        section: "Procurement & Manufacturing",
        status: "not started"
      },
      { 
        id: 21, 
        label: "Component Manufacturing & Assembly", 
        value: sectionPercentage / 4, 
        section: "Procurement & Manufacturing",
        status: "not started"
      },
      { 
        id: 22, 
        label: "Quality Control & Inspection of Manufactured Parts", 
        value: sectionPercentage / 4, 
        section: "Procurement & Manufacturing",
        status: "not started"
      },
      
      // Assembly & Integration (5 checkpoints)
      { 
        id: 23, 
        label: "Assembly & Integration", 
        value: sectionPercentage / 5, 
        section: "Assembly & Integration",
        status: "not started"
      },
      { 
        id: 24, 
        label: "Sub-system Assembly", 
        value: sectionPercentage / 5, 
        section: "Assembly & Integration",
        status: "not started"
      },
      { 
        id: 25, 
        label: "Integration of Sub-systems into Main Testing Unit", 
        value: sectionPercentage / 5, 
        section: "Assembly & Integration",
        status: "not started"
      },
      { 
        id: 26, 
        label: "Cabling & Wiring Installation", 
        value: sectionPercentage / 5, 
        section: "Assembly & Integration",
        status: "not started"
      },
      { 
        id: 27, 
        label: "Initial Power-up & Basic Functionality Tests", 
        value: sectionPercentage / 5, 
        section: "Assembly & Integration",
        status: "not started"
      },
      
      // Testing & Validation (7 checkpoints)
      { 
        id: 28, 
        label: "Factory Acceptance Test (FAT) Plan Development", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      { 
        id: 29, 
        label: "FAT Execution", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      { 
        id: 30, 
        label: "Defect Identification & Resolution", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      { 
        id: 31, 
        label: "Client/User Acceptance Test (UAT) Plan Development", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      { 
        id: 32, 
        label: "UAT Execution", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      { 
        id: 33, 
        label: "Performance & Safety Compliance Testing", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      { 
        id: 34, 
        label: "Test Report Generation & Review", 
        value: sectionPercentage / 7, 
        section: "Testing & Validation",
        status: "not started"
      },
      
      // Deployment & Training (5 checkpoints)
      { 
        id: 35, 
        label: "Packaging & Transportation of Testing Unit", 
        value: sectionPercentage / 5, 
        section: "Deployment & Training",
        status: "not started"
      },
      { 
        id: 36, 
        label: "On-site Installation & Setup", 
        value: sectionPercentage / 5, 
        section: "Deployment & Training",
        status: "not started"
      },
      { 
        id: 37, 
        label: "Site Acceptance Test (SAT) Execution", 
        value: sectionPercentage / 5, 
        section: "Deployment & Training",
        status: "not started"
      },
      { 
        id: 38, 
        label: "Operational Training for End-Users", 
        value: sectionPercentage / 5, 
        section: "Deployment & Training",
        status: "not started"
      },
      { 
        id: 39, 
        label: "Maintenance Training for Technical Staff", 
        value: sectionPercentage / 5, 
        section: "Deployment & Training",
        status: "not started"
      },
      
      // Project Closure & Post-Deployment (3 checkpoints)
      { 
        id: 40, 
        label: "Final Documentation Handover", 
        value: sectionPercentage / 3, 
        section: "Project Closure & Post-Deployment",
        status: "not started"
      },
      { 
        id: 41, 
        label: "Warranty & Support Agreement Finalization", 
        value: sectionPercentage / 3, 
        section: "Project Closure & Post-Deployment",
        status: "not started"
      },
      { 
        id: 42, 
        label: "Final Project Report & Financial Closure", 
        value: sectionPercentage / 3, 
        section: "Project Closure & Post-Deployment",
        status: "not started"
      },
    ],
  };

  const [selected, setSelected] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [statuses, setStatuses] = useState({});

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Initialize statuses
    const initialStatuses = {};
    project.checkpoints.forEach(cp => {
      initialStatuses[cp.id] = cp.status;
    });
    setStatuses(initialStatuses);
    
    return () => clearInterval(timer);
  }, []);

  const handleToggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
      // When unchecking, set status back to "not started"
      setStatuses(prev => ({
        ...prev,
        [id]: "not started"
      }));
    } else {
      setSelected([...selected, id]);
      // When checking, automatically set status to "completed"
      setStatuses(prev => ({
        ...prev,
        [id]: "completed"
      }));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStatuses(prev => ({
      ...prev,
      [id]: newStatus
    }));
    
    // If status is changed to "completed", automatically check the checkbox
    if (newStatus === "completed" && !selected.includes(id)) {
      setSelected([...selected, id]);
    }
    
    // If status is changed from "completed" to something else, uncheck the checkbox
    if (newStatus !== "completed" && selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    }
  };

  const progress = project.checkpoints
    .filter((p) => selected.includes(p.id))
    .reduce((sum, p) => sum + p.value, 0);

  const completedTasks = project.checkpoints.filter((p) =>
    selected.includes(p.id)
  );
  const remainingTasks = project.checkpoints.filter(
    (p) => !selected.includes(p.id)
  );

  // Group checkpoints by section
  const checkpointsBySection = project.checkpoints.reduce((acc, cp) => {
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
  const hoursUntilDeadline = Math.ceil((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesUntilDeadline = Math.ceil((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
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
    switch(status) {
      case "completed": return "text-green-400";
      case "at risk": return "text-red-400";
      case "in progress": return "text-yellow-400";
      case "on schedule": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  // Get status background color
  const getStatusBgColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-900/30 border-green-700";
      case "at risk": return "bg-red-900/30 border-red-700";
      case "in progress": return "bg-yellow-900/30 border-yellow-700";
      case "on schedule": return "bg-blue-900/30 border-blue-700";
      default: return "bg-gray-900/30 border-gray-700";
    }
  };

  // Get border color based on status
  const getBorderColor = (status) => {
    switch(status) {
      case "completed": return "border-green-700";
      case "at risk": return "border-red-700";
      case "in progress": return "border-yellow-700";
      case "on schedule": return "border-blue-700";
      default: return "border-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Project Header */}
        <div className="mb-8 bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {project.name}
              </h1>
              <p className="text-gray-300 mb-4 max-w-3xl">{project.description}</p>
            </div>
            <div className="bg-blue-900/30 px-4 py-3 rounded-lg border border-blue-700 min-w-[180px]">
              <p className="text-sm text-blue-300">Project Deadline</p>
              <p className="font-semibold">{project.deadline}</p>
              <p className={`text-xs mt-1 ${getDeadlineUrgency()}`}>
                {formatTimeRemaining()}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8 bg-gradient-to-br from-black/70 to-blue-900/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-blue-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-300">Project Progress</h2>
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
                    <li key={t.id} className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      <span>{t.label}</span>
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
                    <p>You're behind schedule. Focus on completing the upcoming milestones.</p>
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
                    <p>Excellent progress! You're on track to meet the deadline.</p>
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
                    <li key={t.id} className="flex items-start">
                      <span className="text-red-400 mr-2">•</span>
                      <span>{t.label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">All checkpoints completed 🎉</p>
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
              {completedTasks.length}/{project.checkpoints.length} completed
            </span>
          </div>
          
          {/* Group checkpoints by section */}
          {Object.entries(checkpointsBySection).map(([section, checkpoints]) => (
            <div key={section} className="mb-8 last:mb-0">
              <h3 className="text-lg font-semibold text-blue-300 mb-4 border-b border-blue-800 pb-2">
                {section}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {checkpoints.map((cp) => {
                  const currentStatus = statuses[cp.id] || "not started";
                  return (
                    <div
                      key={cp.id}
                      className={`flex flex-col p-4 rounded-xl border transition-all duration-300 ${
                        getBorderColor(currentStatus)
                      } ${
                        selected.includes(cp.id)
                          ? "bg-blue-900/30 shadow-lg scale-[1.02]"
                          : "bg-gradient-to-b from-gray-800/50 to-gray-900/70 hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-start mb-2">
                        <input
                          type="checkbox"
                          checked={selected.includes(cp.id)}
                          onChange={() => handleToggle(cp.id)}
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
                      <div className={`mt-2 text-xs px-2 py-1 rounded-full w-fit ${getStatusBgColor(currentStatus)} ${getStatusColor(currentStatus)}`}>
                        {currentStatus.replace("_", " ")}
                      </div>
                      
                      {/* Status dropdown */}
                      <div className="mt-2">
                        <label className="text-xs text-gray-400 block mb-1">Update Status:</label>
                        <select 
                          value={currentStatus} 
                          onChange={(e) => handleStatusChange(cp.id, e.target.value)}
                          className={`text-xs p-1 rounded w-full bg-gray-700 border ${getBorderColor(currentStatus)} ${getStatusColor(currentStatus)}`}
                        >
                          <option value="not started" className="text-gray-400">Not Started</option>
                          <option value="on schedule" className="text-blue-400">On Schedule</option>
                          <option value="in progress" className="text-yellow-400">In Progress</option>
                          <option value="at risk" className="text-red-400">At Risk</option>
                          <option value="completed" className="text-green-400">Completed</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}