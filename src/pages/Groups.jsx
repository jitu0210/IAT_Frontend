import React, { useState, useEffect } from "react";
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
    participation: 0
  });
  const [comments, setComments] = useState("");
  const [user, setUser] = useState(null);
  const [hasRated, setHasRated] = useState({});
  const [viewMode, setViewMode] = useState("ranking"); // ranking, participants, history

  const navigate = useNavigate();

  // Predefined groups
  const predefinedGroups = [
    { id: 1, name: "Path finder", members: [], ratings: [] },
    { id: 2, name: "Nova", members: [], ratings: [] },
    { id: 3, name: "Fusion force", members: [], ratings: [] },
    { id: 4, name: "Wit squad", members: [], ratings: [] },
    { id: 5, name: "Explorers", members: [], ratings: [] }
  ];

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

  // Load groups from localStorage or initialize with predefined groups
  const loadGroups = () => {
    const storedGroups = localStorage.getItem("groups");
    const storedRatings = localStorage.getItem("groupRatings");
    
    if (storedGroups && storedRatings) {
      const groupsData = JSON.parse(storedGroups);
      const ratingsData = JSON.parse(storedRatings);
      
      // Check if ratings need to be reset (after 7 days)
      const lastReset = localStorage.getItem("lastRatingReset");
      const now = new Date().getTime();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      
      if (!lastReset || (now - parseInt(lastReset)) > sevenDays) {
        // Reset all ratings
        const resetGroups = groupsData.map(group => ({
          ...group,
          ratings: [],
          totalRating: 0,
          ratingCount: 0,
          avgCommunication: 0,
          avgPresentation: 0,
          avgContent: 0,
          avgHelpfulForCompany: 0,
          avgHelpfulForInterns: 0,
          avgParticipation: 0
        }));
        
        localStorage.setItem("groups", JSON.stringify(resetGroups));
        localStorage.setItem("groupRatings", JSON.stringify({}));
        localStorage.setItem("lastRatingReset", now.toString());
        
        setGroups(resetGroups);
        setHasRated({});
      } else {
        setGroups(groupsData);
        setHasRated(ratingsData);
      }
    } else {
      // Initialize with predefined groups
      localStorage.setItem("groups", JSON.stringify(predefinedGroups));
      localStorage.setItem("groupRatings", JSON.stringify({}));
      localStorage.setItem("lastRatingReset", new Date().getTime().toString());
      setGroups(predefinedGroups);
      setHasRated({});
    }
  };

  useEffect(() => {
    if (user) {
      loadGroups();
    }
  }, [user]);

  // Calculate group statistics
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
        avgParticipation: 0
      };
    }

    const totalComm = group.ratings.reduce((sum, r) => sum + r.communication, 0);
    const totalPres = group.ratings.reduce((sum, r) => sum + r.presentation, 0);
    const totalCont = group.ratings.reduce((sum, r) => sum + r.content, 0);
    const totalComp = group.ratings.reduce((sum, r) => sum + r.helpfulForCompany, 0);
    const totalInt = group.ratings.reduce((sum, r) => sum + r.helpfulForInterns, 0);
    const totalPart = group.ratings.reduce((sum, r) => sum + r.participation, 0);
    
    const count = group.ratings.length;
    
    return {
      totalRating: (totalComm + totalPres + totalCont + totalComp + totalInt + totalPart) / count,
      ratingCount: count,
      avgCommunication: totalComm / count,
      avgPresentation: totalPres / count,
      avgContent: totalCont / count,
      avgHelpfulForCompany: totalComp / count,
      avgHelpfulForInterns: totalInt / count,
      avgParticipation: totalPart / count
    };
  };

  // Join a group
  const handleJoinGroup = async (groupId) => {
    try {
      const storedGroups = JSON.parse(localStorage.getItem("groups"));
      const updatedGroups = storedGroups.map(group => {
        if (group.id === groupId) {
          // Check if user is already a member
          if (!group.members.some(member => member.id === user._id)) {
            return {
              ...group,
              members: [...group.members, {
                id: user._id,
                name: user.name,
                email: user.email,
                branch: user.branch || "Not specified",
                joinDate: new Date().toISOString()
              }]
            };
          }
        }
        return group;
      });
      
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      setGroups(updatedGroups);
      setSuccess("Joined group successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error joining group:", err);
      setError("Failed to join group");
    }
  };

  // Leave a group
  const handleLeaveGroup = async (groupId) => {
    try {
      const storedGroups = JSON.parse(localStorage.getItem("groups"));
      const updatedGroups = storedGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter(member => member.id !== user._id)
          };
        }
        return group;
      });
      
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      setGroups(updatedGroups);
      setSuccess("Left group successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error leaving group:", err);
      setError("Failed to leave group");
    }
  };

  // Submit rating
  const handleSubmitRating = async () => {
    try {
      setLoading(true);
      setError("");
      
      const storedGroups = JSON.parse(localStorage.getItem("groups"));
      const storedRatings = JSON.parse(localStorage.getItem("groupRatings")) || {};
      
      // Update user's rating record
      const userRatings = storedRatings[user._id] || {};
      userRatings[selectedGroup.id] = new Date().getTime();
      storedRatings[user._id] = userRatings;
      
      // Add rating to group
      const updatedGroups = storedGroups.map(group => {
        if (group.id === selectedGroup.id) {
          const newRating = {
            userId: user._id,
            userName: user.name,
            communication: ratings.communication,
            presentation: ratings.presentation,
            content: ratings.content,
            helpfulForCompany: ratings.helpfulForCompany,
            helpfulForInterns: ratings.helpfulForInterns,
            participation: ratings.participation,
            comments: comments,
            date: new Date().toISOString()
          };
          
          return {
            ...group,
            ratings: [...group.ratings, newRating]
          };
        }
        return group;
      });
      
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      localStorage.setItem("groupRatings", JSON.stringify(storedRatings));
      
      setGroups(updatedGroups);
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
      setError("Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  // Remove rating
  const handleRemoveRating = async (groupId) => {
    try {
      setLoading(true);
      setError("");
      
      const storedGroups = JSON.parse(localStorage.getItem("groups"));
      const storedRatings = JSON.parse(localStorage.getItem("groupRatings")) || {};
      
      // Remove user's rating record
      if (storedRatings[user._id]) {
        delete storedRatings[user._id][groupId];
      }
      
      // Remove rating from group
      const updatedGroups = storedGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            ratings: group.ratings.filter(rating => rating.userId !== user._id)
          };
        }
        return group;
      });
      
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      localStorage.setItem("groupRatings", JSON.stringify(storedRatings));
      
      setGroups(updatedGroups);
      setSuccess("Rating removed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error removing rating:", err);
      setError("Failed to remove rating");
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
    const group = groups.find(g => g.id === groupId);
    return group && group.members.some(member => member.id === user?._id);
  };

  // Check if user has rated a group
  const hasUserRated = (groupId) => {
    const storedRatings = JSON.parse(localStorage.getItem("groupRatings")) || {};
    const userRatings = storedRatings[user?._id] || {};
    return !!userRatings[groupId];
  };

  // Handle rating input change with validation
  const handleRatingChange = (category, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 40) {
      setRatings({...ratings, [category]: numValue});
    }
  };

  // Navigate to group detail page
  const handleViewGroupDetails = (group) => {
    navigate(`/group-detail/${group.name}`, { state: { group } });
  };

  // View rating history
  const handleViewHistory = (group) => {
    setSelectedGroup(group);
    setViewMode("history");
  };

  // View participants
  const handleViewParticipants = (group) => {
    setSelectedGroup(group);
    setViewMode("participants");
  };

  // Clear messages after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Sort groups by total rating
  const sortedGroups = [...groups].sort((a, b) => {
    const statsA = calculateGroupStats(a);
    const statsB = calculateGroupStats(b);
    return statsB.totalRating - statsA.totalRating;
  });

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Intern's Group
          </h1>
          <p className="text-blue-400 mb-8 text-center max-w-2xl mx-auto">
            View and rate intern groups. Each group can be rated on communication, presentation, content, usefulness for company and interns, and participation.
          </p>

          {/* User info */}
          {user && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Logged in as: <span className="text-blue-400 font-medium">{user.name || user.email}</span></p>
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

          {/* Groups List */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Groups Ranking</h2>
            
            {sortedGroups.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-xl">
                <p className="text-gray-400">No groups available.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedGroups.map((group, index) => {
                  const stats = calculateGroupStats(group);
                  const userHasRated = hasUserRated(group.id);
                  
                  return (
                    <div
                      key={group.id}
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
                            {stats.totalRating.toFixed(1)}/240
                          </div>
                          <div className="text-sm text-gray-400">
                            {stats.ratingCount} rating{stats.ratingCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-400 space-y-2">
                        <div className="flex justify-between">
                          <span>Communication:</span>
                          <span className="font-medium">{stats.avgCommunication.toFixed(1)}/40</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Presentation:</span>
                          <span className="font-medium">{stats.avgPresentation.toFixed(1)}/40</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Content:</span>
                          <span className="font-medium">{stats.avgContent.toFixed(1)}/40</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Useful for Company:</span>
                          <span className="font-medium">{stats.avgHelpfulForCompany.toFixed(1)}/40</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Useful for Interns:</span>
                          <span className="font-medium">{stats.avgHelpfulForInterns.toFixed(1)}/40</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span>Participation:</span>
                          <span className="font-medium">{stats.avgParticipation.toFixed(1)}/40</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-700">
                        {userHasRated ? (
                          <button
                            onClick={() => handleRemoveRating(group.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition flex-grow"
                          >
                            Remove Rating
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedGroup(group);
                              setViewMode("rating");
                            }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex-grow"
                          >
                            Rate Group
                          </button>
                        )}
                        
                        {isUserMember(group.id) ? (
                          <button
                            onClick={() => handleLeaveGroup(group.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
                          >
                            Leave Group
                          </button>
                        ) : (
                          <button
                            onClick={() => handleJoinGroup(group.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition"
                          >
                            Join
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleViewParticipants(group)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition flex-grow"
                        >
                          View Participants
                        </button>
                        
                        <button
                          onClick={() => handleViewHistory(group)}
                          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition flex-grow"
                        >
                          Rating History
                        </button>
                        
                        {/* <button
                          onClick={() => handleViewGroupDetails(group)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition w-full"
                        >
                          View Details
                        </button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rating Modal */}
      {selectedGroup && viewMode === "rating" && (
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
                onClick={() => {
                  setSelectedGroup(null);
                  setViewMode("ranking");
                }}
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

      {/* Participants Modal */}
      {selectedGroup && viewMode === "participants" && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {selectedGroup.name} Participants
            </h2>
            
            {selectedGroup.members.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No participants yet.</p>
            ) : (
              <div className="space-y-3">
                {selectedGroup.members.map((member) => (
                  <div key={member.id} className="bg-gray-700 p-3 rounded-lg">
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
                    <p className="text-sm text-gray-400">Branch: {member.branch}</p>
                    <p className="text-xs text-gray-500">
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
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              {selectedGroup.name} Rating History
            </h2>
            
            {(!selectedGroup.ratings || selectedGroup.ratings.length === 0) ? (
              <p className="text-gray-400 text-center py-4">No ratings yet.</p>
            ) : (
              <div className="space-y-4">
                {selectedGroup.ratings.map((rating, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-white">{rating.userName}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(rating.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Communication:</span>
                        <span className="font-medium">{rating.communication}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Presentation:</span>
                        <span className="font-medium">{rating.presentation}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Content:</span>
                        <span className="font-medium">{rating.content}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Useful for Company:</span>
                        <span className="font-medium">{rating.helpfulForCompany}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Useful for Interns:</span>
                        <span className="font-medium">{rating.helpfulForInterns}/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Participation:</span>
                        <span className="font-medium">{rating.participation}/40</span>
                      </div>
                    </div>
                    
                    {rating.comments && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-sm text-gray-300">{rating.comments}</p>
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
    </div>
  );
}