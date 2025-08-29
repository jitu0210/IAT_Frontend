import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Interns() {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [branches, setBranches] = useState(["All"]);

  // Fetch interns from backend
  const fetchInterns = async () => {
    try {
      const response = await axios.get("https://iat-backend-5h88.onrender.com/api/v1/user/all-interns");
      setInterns(response.data);
      setFilteredInterns(response.data);
      
      // Extract unique branches
      const uniqueBranches = [...new Set(response.data.map(intern => intern.branch))];
      setBranches(["All", ...uniqueBranches]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

  // Filter interns by branch
  const filterInternsByBranch = (branch) => {
    setSelectedBranch(branch);
    if (branch === "All") {
      setFilteredInterns(interns);
    } else {
      setFilteredInterns(interns.filter(intern => intern.branch === branch));
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-10 md:py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
              Our Interns
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Meet the talented interns who are contributing to Aartech Solonics Limited.
            </p>
          </div>

          {/* Branch Filter Container */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter by Branch
                </h2>
                <p className="text-gray-400 text-sm mt-1">Click on a branch to filter interns</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => filterInternsByBranch(branch)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                      selectedBranch === branch
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    {selectedBranch === branch && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {branch}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-400 inline-flex items-center bg-gray-800/40 px-4 py-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Showing {filteredInterns.length} intern{filteredInterns.length !== 1 ? 's' : ''}
              {selectedBranch !== "All" ? ` from ${selectedBranch}` : ""}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Loading interns...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 max-w-md mx-auto text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-red-800/20 h-12 w-12 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-200 mb-2">Something went wrong</h3>
              <p className="text-red-300 mb-4">{error}</p>
              <button 
                onClick={fetchInterns}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-white transition-colors flex items-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Try Again
              </button>
            </div>
          ) : filteredInterns.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center rounded-full bg-gray-800/50 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">No interns found</h3>
              <p className="text-gray-500">
                {selectedBranch !== "All" 
                  ? `No interns from ${selectedBranch} branch.` 
                  : "No interns available at the moment."}
              </p>
              {selectedBranch !== "All" && (
                <button
                  onClick={() => filterInternsByBranch("All")}
                  className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200 transition-colors inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                  Show All Interns
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInterns.map((intern) => {
                const createdAt = new Date(intern.createdAt);
                const formattedDate = createdAt.toLocaleDateString();
                const formattedTime = createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={intern._id}
                    className="group bg-gradient-to-b from-gray-800/50 to-gray-900/70 rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-left transform hover:-translate-y-1"
                  >
                    <div className="flex items-start mb-4">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full p-2 mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                          {intern.username}
                        </h3>
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-900/30 text-blue-300 text-xs font-medium rounded-full">
                          {intern.branch}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-800/50">
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {formattedDate}
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {formattedTime}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}