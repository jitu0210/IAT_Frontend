import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ActivityTable = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://iat-backend-5h88.onrender.com/api/v1/form/intern-activities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Use the original date format from the API
        const processedActivities = response.data.map(activity => {
          // Create a date object for sorting and filtering
          let dateObj;
          if (activity.date && activity.time) {
            // Try to create a date object from the provided date and time
            dateObj = new Date(`${activity.date}T${activity.time}`);
          } else if (activity.date) {
            // If only date is available
            dateObj = new Date(activity.date);
          } else {
            // Fallback to current date
            dateObj = new Date();
          }
          
          // If date parsing failed, use current date
          if (isNaN(dateObj.getTime())) {
            dateObj = new Date();
          }
          
          return {
            ...activity,
            dateObj: dateObj
          };
        });
        
        // Sort activities by date (newest first)
        processedActivities.sort((a, b) => b.dateObj - a.dateObj);
        
        setActivities(processedActivities);
        setFilteredActivities(processedActivities);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch activities. Please check your authentication.");
        setLoading(false);
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  // Filter activities based on date range and search term
  useEffect(() => {
    let result = [...activities];
    
    // Apply date filter
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    // Declare variables outside of switch to avoid eslint error
    let filterDate;
    
    switch(dateFilter) {
      case "today":
        result = result.filter(activity => {
          const activityDate = new Date(activity.dateObj);
          activityDate.setHours(0, 0, 0, 0);
          return activityDate.getTime() === today.getTime();
        });
        break;
      case "last7days":
        filterDate = new Date(now);
        filterDate.setDate(now.getDate() - 7);
        result = result.filter(activity => {
          const activityDate = new Date(activity.dateObj);
          return activityDate >= filterDate;
        });
        break;
      case "last30days":
        filterDate = new Date(now);
        filterDate.setDate(now.getDate() - 30);
        result = result.filter(activity => {
          const activityDate = new Date(activity.dateObj);
          return activityDate >= filterDate;
        });
        break;
      case "lastYear":
        filterDate = new Date(now);
        filterDate.setFullYear(now.getFullYear() - 1);
        result = result.filter(activity => {
          const activityDate = new Date(activity.dateObj);
          return activityDate >= filterDate;
        });
        break;
      default:
        // "all" - no date filtering
        break;
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(activity => 
        (activity.name && activity.name.toLowerCase().includes(term)) ||
        (activity.branch && activity.branch.toLowerCase().includes(term)) ||
        (activity.activities && activity.activities.toLowerCase().includes(term))
      );
    }
    
    setFilteredActivities(result);
  }, [activities, dateFilter, searchTerm]);

  const handleFilterChange = (filter) => {
    setDateFilter(filter);
  };

  const clearFilters = () => {
    setDateFilter("all");
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading activities...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 max-w-md text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-red-800/20 h-12 w-12 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-200 mb-2">Error Loading Activities</h3>
            <p className="text-red-300 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Intern Activity History
          </h1>
          <p className="text-blue-400 mb-6 max-w-2xl mx-auto">
            The data will be updated when new activity gets added.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
                Search Activities
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, branch or activity..."
                  className="pl-10 w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Filter by Date
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All Time" },
                  { value: "today", label: "Today" },
                  { value: "last7days", label: "Last 7 Days" },
                  { value: "last30days", label: "Last 30 Days" },
                  { value: "lastYear", label: "Last Year" }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterChange(filter.value)}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-300 flex items-center ${
                      dateFilter === filter.value
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    {dateFilter === filter.value && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {(dateFilter !== "all" || searchTerm) && (
              <div className="self-end">
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 inline-flex items-center bg-gray-800/40 px-4 py-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Showing {filteredActivities.length} of {activities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>

        {/* Activities Table */}
        <div className="bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800 sticky top-0 z-10">
                <tr>
                  {["Name", "Branch", "Activities", "Date", "Time"].map(
                    (header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-semibold text-blue-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity, index) => (
                    <tr
                      key={activity.id || index}
                      className="hover:bg-gray-800/50 transition-colors duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full p-2 mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-white">
                            {activity.name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                          {activity.branch || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                        {activity.activities || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {activity.date || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {activity.time || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center"
                    >
                      <div className="inline-flex items-center justify-center rounded-full bg-gray-800/50 p-4 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-400 italic">
                        {searchTerm || dateFilter !== "all" 
                          ? "No activities match your filters" 
                          : "No activities found yet"}
                      </p>
                      {(searchTerm || dateFilter !== "all") && (
                        <button
                          onClick={clearFilters}
                          className="mt-3 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors inline-flex items-center"
                        >
                          Clear Filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ActivityTable;