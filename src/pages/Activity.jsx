import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Decode token to get user info
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.userId, name: decoded.name }); // Adjust based on your token payload
    } catch (err) {
      console.error("Token decoding error:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }

    fetchActivities();
  }, [navigate]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://iat-backend-5h88.onrender.com/api/v1/form/all-forms",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // Sort activities by name in ascending order
      const sortedActivities = response.data.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      setActivities(sortedActivities);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to fetch activities");
        setLoading(false);
        console.error("Fetch activities error:", err);
      }
    }
  };

  const fetchUserHistory = async (userId, userName) => {
    try {
      setHistoryLoading(true);
      setSelectedUser(userName);
      
      const response = await axios.get(
        `https://iat-backend-5h88.onrender.com/api/v1/form/user-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setUserHistory(response.data);
      setIsHistoryModalOpen(true);
      setHistoryLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("Failed to fetch user history");
        setHistoryLoading(false);
        console.error("Fetch user history error:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setUserHistory([]);
    setSelectedUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="bg-black text-white flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p>Please log in to view activities.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Intern <span className="text-blue-400">Activities</span>
            </h1>
            <p className="text-gray-400">
              View all submitted intern activity forms
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Welcome, {user.name}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-4 text-red-400 hover:text-red-200"
            >
              ×
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">No activities found.</p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="px-6 py-4 text-left font-semibold text-blue-400">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-400">
                      Branch
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-400">
                      Activities
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-400">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-blue-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity._id}
                      className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4">{activity.name}</td>
                      <td className="px-6 py-4">{activity.branch}</td>
                      <td className="px-6 py-4 max-w-md truncate">
                        {activity.activities}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(activity.date)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => fetchUserHistory(activity.userId, activity.name)}
                          className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-md text-sm font-medium transition-colors"
                        >
                          History
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-400">
                Activity History for {selectedUser}
              </h2>
              <button
                onClick={closeHistoryModal}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {historyLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
                </div>
              ) : userHistory.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No history found.</p>
              ) : (
                <div className="space-y-4">
                  {userHistory.map((historyItem) => (
                    <div
                      key={historyItem._id}
                      className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">
                          {formatDate(historyItem.date)}
                        </span>
                        <span className="text-sm text-cyan-400 bg-cyan-900 bg-opacity-30 px-2 py-1 rounded">
                          {historyItem.branch}
                        </span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {historyItem.activities}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-800 flex justify-end">
              <button
                onClick={closeHistoryModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
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
};

export default Activity;