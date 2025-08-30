import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [ratings, setRatings] = useState({
    communication: 0,
    presentation: 0,
    content: 0,
    helpfulForCompany: 0,
    helpfulForInterns: 0,
    participation: 0,
  });
  const [comments, setComments] = useState("");
  const [user, setUser] = useState(null);
  const [hasRated, setHasRated] = useState({});
  const [viewMode, setViewMode] = useState("ranking");
  const [showLiveRanking, setShowLiveRanking] = useState(true);
  const [liveRatings, setLiveRatings] = useState([]);
  const [userGroup, setUserGroup] = useState(null);

  const navigate = useNavigate();
  const API_BASE = "https://iat-backend-5h88.onrender.com/api/v1";

  const api = axios.create({
    baseURL: API_BASE,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
    }
  }, [navigate]);

  // Fetch real-time rating updates
  useEffect(() => {
    let intervalId;

    const fetchLiveRatings = async () => {
      try {
        const response = await api.get("/groups/live-ratings");
        if (response.data && response.data.length > 0) {
          setLiveRatings((prevRatings) => {
            // Keep only the latest 15 ratings
            const newRatings = [...prevRatings, ...response.data];
            return newRatings.slice(-15);
          });
        }
      } catch (err) {
        console.error("Error fetching live ratings:", err);
      }
    };

    if (showLiveRanking) {
      // Fetch immediately
      fetchLiveRatings();

      // Then set up interval for periodic updates
      intervalId = setInterval(fetchLiveRatings, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showLiveRanking]);

  const loadGroups = async () => {
    try {
      setLoading(true);

      const response = await api.get("/groups");
      const groupsData = response.data;

      setGroups(groupsData);

      // Find which group the user is a member of
      const userGroupData = groupsData.find(
        (group) =>
          group.members &&
          group.members.some((member) => member.userId === user._id)
      );
      setUserGroup(userGroupData);

      const ratingStatus = {};
      groupsData.forEach((group) => {
        if (group.ratings) {
          const userRating = group.ratings.find((r) => r.userId === user._id);
          ratingStatus[group._id] = !!userRating;
        }
      });

      setHasRated(ratingStatus);
    } catch (err) {
      console.error("Error loading groups:", err);
      setError(err.response?.data?.message || "Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      loadGroups();
    }
  }, [user]);

  const calculateGroupStats = (group) => {
    if (!group.ratings || group.ratings.length === 0) {
      return {
        totalRating: 0,
        ratingCount: 0,
        avgCommunication: 0,
        avgPresentation: 0,
        avgContent: 0,
        avgHelpfulForCompany: 0,
        avgHelpfulForInterns: 0,
        avgParticipation: 0,
      };
    }

    return {
      totalRating: group.totalRating || 0,
      ratingCount: group.ratingCount || 0,
      avgCommunication: group.avgCommunication || 0,
      avgPresentation: group.avgPresentation || 0,
      avgContent: group.avgContent || 0,
      avgHelpfulForCompany: group.avgHelpfulForCompany || 0,
      avgHelpfulForInterns: group.avgHelpfulForInterns || 0,
      avgParticipation: group.avgParticipation || 0,
    };
  };

  const handleJoinGroup = async (groupId) => {
    try {
      setLoading(true);

      await api.post(`/groups/${groupId}/join`);

      await loadGroups(); // This will update the userGroup state
      setSuccess("Joined group successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error joining group:", err);
      setError(err.response?.data?.message || "Failed to join group");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      setLoading(true);

      await api.post(`/groups/${groupId}/leave`);

      await loadGroups(); // This will update the userGroup state
      setSuccess("Left group successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error leaving group:", err);
      setError(err.response?.data?.message || "Failed to leave group");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post(`/groups/${selectedGroup._id}/rate`, {
        communication: ratings.communication,
        presentation: ratings.presentation,
        content: ratings.content,
        helpfulForCompany: ratings.helpfulForCompany,
        helpfulForInterns: ratings.helpfulForInterns,
        participation: ratings.participation,
        comments: comments,
      });

      // Add to live ratings
      if (response.data && response.data.newRating) {
        setLiveRatings((prev) => [
          ...prev,
          {
            id: Date.now(),
            groupName: selectedGroup.name,
            points: calculateTotal(),
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isUser: true,
            details: response.data.newRating,
          },
        ]);
      }

      await loadGroups();
      setSelectedGroup(null);
      setRatings({
        communication: 0,
        presentation: 0,
        content: 0,
        helpfulForCompany: 0,
        helpfulForInterns: 0,
        participation: 0,
      });
      setComments("");
      setSuccess("Rating submitted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError(err.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRating = async (groupId) => {
    try {
      setLoading(true);
      setError("");

      await api.delete(`/groups/${groupId}/rating`);

      await loadGroups();
      setSuccess("Rating removed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error removing rating:", err);
      setError(err.response?.data?.message || "Failed to remove rating");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return Object.values(ratings).reduce((sum, val) => sum + val, 0);
  };

  const getRankSuffix = (index) => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    return `${index + 1}th`;
  };

  const isUserMember = (groupId) => {
    return userGroup && userGroup._id === groupId;
  };

  const hasUserRated = (groupId) => {
    return hasRated[groupId] || false;
  };

  const handleRatingChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 40) {
      setRatings({ ...ratings, [category]: numValue });
    }
  };

  const handleViewHistory = (group) => {
    setSelectedGroup(group);
    setViewMode("history");
  };

  const handleViewParticipants = (group) => {
    setSelectedGroup(group);
    setViewMode("participants");
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const sortedGroups = [...groups].sort((a, b) => {
    const statsA = calculateGroupStats(a);
    const statsB = calculateGroupStats(b);
    return statsB.totalRating - statsA.totalRating;
  });

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <section className="py-8 px-6 flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Intern Groups
                </h1>
                <p className="text-blue-300 max-w-2xl">
                  View and rate intern groups. Each group can be rated on
                  communication, presentation, content, usefulness for company
                  and interns, and participation.
                </p>
              </div>

              {!showLiveRanking && (
                <button
                  onClick={() => setShowLiveRanking(true)}
                  className="hidden lg:flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Show Live Ranking
                </button>
              )}
            </div>

            {/* User info */}
            {user && (
              <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center">
                  <div className="bg-blue-700 p-2 rounded-lg mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400">Logged in as</p>
                    <p className="text-blue-400 font-medium">
                      {user.name || user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 animate-fadeIn">
                <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {success}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 animate-fadeIn">
                <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Groups List */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-400">
                  Groups Ranking
                </h2>
                <div className="text-sm text-gray-400">
                  {sortedGroups.length} group
                  {sortedGroups.length !== 1 ? "s" : ""} total
                </div>
              </div>

              {sortedGroups.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-500 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-400">No groups available.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedGroups.map((group, index) => {
                    const stats = calculateGroupStats(group);
                    const userHasRated = hasUserRated(group._id);
                    const isMember = isUserMember(group._id);

                    return (
                      <div
                        key={group._id}
                        className="bg-gray-800 rounded-xl p-6 flex flex-col border border-gray-700 hover:border-blue-400/30 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative"
                      >
                        {/* Ranking badge */}
                        <div
                          className={`absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : index === 2
                              ? "bg-amber-700"
                              : "bg-blue-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-blue-400">
                              {group.name}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              {group.members ? group.members.length : 0} member
                              {group.members && group.members.length !== 1
                                ? "s"
                                : ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">
                              {stats.totalRating.toFixed(1)}
                              <span className="text-sm text-gray-400">
                                /240
                              </span>
                            </div>
                            <div className="text-sm text-gray-400">
                              {stats.ratingCount} rating
                              {stats.ratingCount !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>

                        {/* Progress bar for overall rating */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Overall Score</span>
                            <span>
                              {Math.round((stats.totalRating / 240) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{
                                width: `${(stats.totalRating / 240) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-400 space-y-2">
                          {[
                            {
                              label: "Communication",
                              value: stats.avgCommunication,
                            },
                            {
                              label: "Presentation",
                              value: stats.avgPresentation,
                            },
                            { label: "Content", value: stats.avgContent },
                            {
                              label: "Useful for Company",
                              value: stats.avgHelpfulForCompany,
                            },
                            {
                              label: "Useful for Interns",
                              value: stats.avgHelpfulForInterns,
                            },
                            {
                              label: "Participation",
                              value: stats.avgParticipation,
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center"
                            >
                              <span>{item.label}:</span>
                              <div className="flex items-center">
                                <div className="w-16 bg-gray-700 rounded-full h-1.5 mr-2">
                                  <div
                                    className="bg-blue-500 h-1.5 rounded-full"
                                    style={{
                                      width: `${(item.value / 40) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="font-medium w-10 text-right">
                                  {item.value.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700">
                          {userHasRated ? (
                            <button
                              onClick={() => handleRemoveRating(group._id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition flex-grow flex items-center justify-center"
                              disabled={loading}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Remove Rating
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedGroup(group);
                                setViewMode("rating");
                              }}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex-grow flex items-center justify-center"
                              disabled={
                                loading ||
                                isUserMember(group._id) ||
                                !!userGroup
                              }
                              title={
                                isUserMember(group._id)
                                  ? "Cannot rate your own group"
                                  : userGroup
                                  ? "You can only rate one group"
                                  : ""
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {isUserMember(group._id)
                                ? "Your Group"
                                : userGroup
                                ? "Already Rated"
                                : "Rate Group"}
                            </button>
                          )}

                          {isMember ? (
                            <button
                              onClick={() => handleLeaveGroup(group._id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition flex items-center"
                              disabled={loading}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Leave
                            </button>
                          ) : (
                            <button
                              onClick={() => handleJoinGroup(group._id)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition flex items-center"
                              disabled={loading || !!userGroup}
                              title={
                                userGroup ? "You can only join one group" : ""
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {userGroup ? "Already Joined" : "Join"}
                            </button>
                          )}

                          <button
                            onClick={() => handleViewParticipants(group)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition flex items-center flex-grow"
                            disabled={loading}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            Participants
                          </button>

                          <button
                            onClick={() => handleViewHistory(group)}
                            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition flex items-center flex-grow"
                            disabled={loading}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            History
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Live Ranking Sidebar - Moved to right side */}
        {showLiveRanking && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col hidden lg:flex">
            <div className="p-4 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue-400">
                Live Ranking Updates
              </h2>
              <button
                onClick={() => setShowLiveRanking(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {/* Animated live indicator */}
              <div className="absolute top-2 right-2 flex items-center z-10">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="ml-1 text-xs text-red-400 font-medium">
                  LIVE
                </span>
              </div>

              <div className="h-full overflow-y-auto px-2 py-4">
                <div className="space-y-3">
                  {liveRatings.map((rating) => (
                    <div
                      key={rating.id}
                      className={`p-3 rounded-lg bg-gray-750 border-l-4 ${
                        rating.isUser
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-purple-500"
                      } animate-fadeIn`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-white">
                          {rating.groupName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {rating.time}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-300">
                          Received rating:
                        </span>
                        <span className="font-bold text-green-400">
                          +{rating.points} pts
                        </span>
                      </div>
                      {rating.details && (
                        <div className="mt-2 text-xs text-gray-400 grid grid-cols-2 gap-1">
                          <div>Comm: {rating.details.communication}/40</div>
                          <div>Pres: {rating.details.presentation}/40</div>
                          <div>Content: {rating.details.content}/40</div>
                          <div>
                            Company: {rating.details.helpfulForCompany}/40
                          </div>
                          <div>
                            Interns: {rating.details.helpfulForInterns}/40
                          </div>
                          <div>Part: {rating.details.participation}/40</div>
                        </div>
                      )}
                      {rating.isUser && (
                        <div className="text-xs text-blue-400 mt-1">
                          Your rating
                        </div>
                      )}
                    </div>
                  ))}

                  {liveRatings.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto mb-3 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <p>Live rating updates will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-850 border-t border-gray-700">
              <div className="text-center text-xs text-gray-500">
                <p>Updates every 5 seconds</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {selectedGroup && viewMode === "rating" && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              Rate {selectedGroup.name}
            </h2>

            <div className="space-y-4">
              {[
                { key: "communication", label: "Communication (0-40)" },
                { key: "presentation", label: "Presentation (0-40)" },
                { key: "content", label: "Content (0-40)" },
                {
                  key: "helpfulForCompany",
                  label: "Helpful for Company (0-40)",
                },
                {
                  key: "helpfulForInterns",
                  label: "Helpful for Interns (0-40)",
                },
                { key: "participation", label: "Participation (0-40)" },
              ].map((item) => (
                <div key={item.key} className="flex flex-col">
                  <label className="text-gray-300 mb-1">{item.label}</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={ratings[item.key]}
                    onChange={(e) =>
                      handleRatingChange(item.key, e.target.value)
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>0</span>
                    <span className="font-medium">{ratings[item.key]}/40</span>
                    <span>40</span>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-gray-700">
                <p className="font-bold text-lg text-center text-green-400">
                  Total: {calculateTotal()} / 240
                </p>
              </div>

              <div>
                <label className="block mb-1 text-gray-300">Comments:</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows="3"
                  maxLength="500"
                  placeholder="Add your comments here (optional)"
                ></textarea>
                <p className="text-xs text-gray-500 text-right mt-1">
                  {comments.length}/500 characters
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedGroup(null);
                  setViewMode("ranking");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRating}
                disabled={loading || calculateTotal() === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Rating"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {selectedGroup && viewMode === "participants" && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {selectedGroup.name} Participants
            </h2>

            {!selectedGroup.members || selectedGroup.members.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p>No participants yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedGroup.members.map((member) => (
                  <div
                    key={member.userId}
                    className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                  >
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <p className="text-sm text-gray-400">
                      Branch: {member.branch}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Joined: {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setSelectedGroup(null);
                  setViewMode("ranking");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating History Modal */}
      {selectedGroup && viewMode === "history" && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {selectedGroup.name} Rating History
            </h2>

            {!selectedGroup.ratings || selectedGroup.ratings.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p>No ratings yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedGroup.ratings.map((rating, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-white">
                        {rating.userName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Communication:</span>
                        <span className="font-medium">
                          {rating.communication}/40
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Presentation:</span>
                        <span className="font-medium">
                          {rating.presentation}/40
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Content:</span>
                        <span className="font-medium">{rating.content}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Useful for Company:
                        </span>
                        <span className="font-medium">
                          {rating.helpfulForCompany}/40
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Useful for Interns:
                        </span>
                        <span className="font-medium">
                          {rating.helpfulForInterns}/40
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Participation:</span>
                        <span className="font-medium">
                          {rating.participation}/40
                        </span>
                      </div>
                    </div>

                    {rating.comments && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-sm text-gray-300">
                          {rating.comments}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setSelectedGroup(null);
                  setViewMode("ranking");
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          transition: all 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
