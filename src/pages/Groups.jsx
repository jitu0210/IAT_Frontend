import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
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
    participation: 0
  });
  const [comments, setComments] = useState("");
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [hasRated, setHasRated] = useState({});

  const navigate = useNavigate();

  // Check if user is authenticated
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

  // Fetch groups from backend
  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://iat-backend-5h88.onrender.com/api/v1/groups", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Sort groups by total rating in descending order
      const sortedGroups = response.data.sort((a, b) => b.totalRating - a.totalRating);
      setGroups(sortedGroups);
      
      // Check which groups user has rated
      const ratedGroups = {};
      sortedGroups.forEach(group => {
        if (group.ratings && group.ratings.some(rating => rating.userId._id === user?._id)) {
          ratedGroups[group._id] = true;
        }
      });
      setHasRated(ratedGroups);
      
      // Check which groups user is a member of
      if (user) {
        const userGroupIds = sortedGroups
          .filter(group => group.members.some(member => member._id === user._id))
          .map(group => group._id);
        setUserGroups(userGroupIds);
      }
    } catch (err) {
      console.error("Error fetching groups:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      setError("Failed to fetch groups");
    }
  };

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user]);

  // Create a new group
  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://iat-backend-5h88.onrender.com/api/v1/groups",
        { name: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      setGroups([...groups, response.data]);
      setGroupName("");
      setSuccess("Group created successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchGroups(); // Refresh the list
    } catch (err) {
      console.error("Error creating group:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      setError(err.response?.data?.message || "Failed to create group. Please check your permissions.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a group
  const handleDeleteGroup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://iat-backend-5h88.onrender.com/api/v1/groups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGroups(groups.filter((g) => g._id !== id));
      setSuccess("Group deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting group:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      setError("Failed to delete group. You may not have permission.");
    }
  };

  // Join a group
  const handleJoinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
      
      // Check if user is already in a group
      if (userGroups.length > 0) {
        setError("You can only join one group at a time. Please leave your current group first.");
        return;
      }
      
      await axios.post(
        `https://iat-backend-5h88.onrender.com/api/v1/groups/${groupId}/members`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      // Update user groups and refresh
      setUserGroups([groupId]);
      fetchGroups();
      setSuccess("Joined group successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error joining group:", err);
      setError(err.response?.data?.message || "Failed to join group");
    }
  };

  // Leave a group - FIXED
  const handleLeaveGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://iat-backend-5h88.onrender.com/api/v1/groups/${groupId}/members/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update user groups and refresh
      setUserGroups(userGroups.filter(id => id !== groupId));
      fetchGroups();
      setSuccess("Left group successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error leaving group:", err);
      setError(err.response?.data?.message || "Failed to leave group");
    }
  };

  // Submit rating - FIXED
  const handleSubmitRating = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      setError("");
      
      await axios.post(
        `https://iat-backend-5h88.onrender.com/api/v1/groups/${selectedGroup._id}/ratings`,
        { 
          communication: ratings.communication,
          presentation: ratings.presentation,
          content: ratings.content,
          helpfulForCompany: ratings.helpfulForCompany,
          helpfulForInterns: ratings.helpfulForInterns,
          participation: ratings.participation,
          comments 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      // Update groups to reflect new rating
      fetchGroups();
      setSelectedGroup(null);
      setRatings({
        communication: 0,
        presentation: 0,
        content: 0,
        helpfulForCompany: 0,
        helpfulForInterns: 0,
        participation: 0
      });
      setComments("");
      setSuccess("Rating submitted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error submitting rating:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
      setError(err.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total score
  const calculateTotal = () => {
    return Object.values(ratings).reduce((sum, val) => sum + val, 0);
  };

  // Format the rating value with proper suffix
  const getRankSuffix = (index) => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    return `${index + 1}th`;
  };

  // Check if user is member of a group
  const isUserMember = (groupId) => {
    return userGroups.includes(groupId);
  };

  // Check if user can rate a group
  const canUserRate = (groupId) => {
    return !isUserMember(groupId) && !hasRated[groupId];
  };

  // Handle rating input change with validation
  const handleRatingChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 40) {
      setRatings({...ratings, [category]: numValue});
    }
  };

  // Clear messages after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Intern's Group
          </h1>
          <p className="text-blue-400 mb-8 text-center max-w-2xl mx-auto">
            Create and manage intern groups. Each group can be rated on communication, presentation, content, usefulness for company and interns, and participation.
          </p>

          {/* User info */}
          {user && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Logged in as: <span className="text-blue-400 font-medium">{user.name || user.email}</span></p>
              <p className="text-gray-400 mt-1">
                {userGroups.length > 0 
                  ? `You are in the group: ${groups.find(g => g._id === userGroups[0])?.name || ''}`
                  : "You are not in any group"}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg">
                {success}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            </div>
          )}

          {/* Create Group Input */}
          <div className="bg-gray-800 p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Create New Group</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400 flex-grow w-full"
              />
              <button
                onClick={handleCreateGroup}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition w-full md:w-auto disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Group"}
              </button>
            </div>
          </div>

          {/* Groups List */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Groups Ranking</h2>
            
            {groups.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-xl">
                <p className="text-gray-400">No groups created yet. Create the first group!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.map((group, index) => (
                  <div
                    key={group._id}
                    className="bg-gray-800 rounded-xl p-6 flex flex-col border border-gray-700 hover:border-blue-400/30 transition-all shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-yellow-400 font-bold text-lg">
                          {getRankSuffix(index)}
                        </span>
                        <h3 className="text-xl font-bold text-blue-400 mt-1">{group.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">
                          {group.totalRating?.toFixed(1) || 0}/240
                        </div>
                        <div className="text-sm text-gray-400">
                          {group.ratingCount || 0} rating{group.ratingCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-400 space-y-2">
                      <div className="flex justify-between">
                        <span>Communication:</span>
                        <span className="font-medium">{group.avgCommunication?.toFixed(1) || 0}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Presentation:</span>
                        <span className="font-medium">{group.avgPresentation?.toFixed(1) || 0}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Content:</span>
                        <span className="font-medium">{group.avgContent?.toFixed(1) || 0}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Useful for Company:</span>
                        <span className="font-medium">{group.avgHelpfulForCompany?.toFixed(1) || 0}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Useful for Interns:</span>
                        <span className="font-medium">{group.avgHelpfulForInterns?.toFixed(1) || 0}/40</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span>Participation:</span>
                        <span className="font-medium">{group.avgParticipation?.toFixed(1) || 0}/40</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700">
                      {isUserMember(group._id) ? (
                        <>
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="px-4 py-2 bg-gray-600 rounded-lg font-medium transition cursor-not-allowed opacity-50"
                            disabled={true}
                            title="Cannot rate your own group"
                          >
                            Rate Group
                          </button>
                          <button
                            onClick={() => handleLeaveGroup(group._id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
                          >
                            Leave Group
                          </button>
                        </>
                      ) : hasRated[group._id] ? (
                        <button
                          className="px-4 py-2 bg-green-600 rounded-lg font-medium transition cursor-not-allowed opacity-50 w-full"
                          disabled={true}
                        >
                          Already Rated
                        </button>
                      ) : userGroups.length > 0 ? (
                        <button
                          className="px-4 py-2 bg-gray-600 rounded-lg font-medium transition cursor-not-allowed opacity-50 w-full"
                          disabled={true}
                          title="You can only join one group"
                        >
                          Already in another group
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex-grow"
                          >
                            Rate Group
                          </button>
                          <button
                            onClick={() => handleJoinGroup(group._id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
                          >
                            Join
                          </button>
                        </>
                      )}
                      {group.members.some(member => member._id === user?._id) && (
                        <button
                          onClick={() => handleDeleteGroup(group._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition ml-auto"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rating Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Rate {selectedGroup.name}
            </h2>
            
            <div className="space-y-4">
              {[
                { key: 'communication', label: 'Communication (0-40)' },
                { key: 'presentation', label: 'Presentation (0-40)' },
                { key: 'content', label: 'Content (0-40)' },
                { key: 'helpfulForCompany', label: 'Helpful for Company (0-40)' },
                { key: 'helpfulForInterns', label: 'Helpful for Interns (0-40)' },
                { key: 'participation', label: 'Participation (0-40)' },
              ].map((item) => (
                <div key={item.key} className="flex flex-col">
                  <label className="text-gray-300 mb-1">{item.label}</label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={ratings[item.key]}
                    onChange={(e) => handleRatingChange(item.key, e.target.value)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>0</span>
                    <span className="font-medium">{ratings[item.key]}/40</span>
                    <span>40</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-2 border-t border-gray-700">
                <p className="font-bold text-lg text-center">Total: {calculateTotal()} / 240</p>
              </div>
              
              <div>
                <label className="block mb-1 text-gray-300">Comments:</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded text-white"
                  rows="3"
                  maxLength="500"
                  placeholder="Add your comments here (optional)"
                ></textarea>
                <p className="text-xs text-gray-500 text-right mt-1">{comments.length}/500 characters</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRating}
                disabled={loading || calculateTotal() === 0}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Rating"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}