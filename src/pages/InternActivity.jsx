import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ActivityTable = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token"); // Or your auth token storage method
        const response = await axios.get(
          "http://localhost:8000/api/v1/form/intern-activities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActivities(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch activities");
        setLoading(false);
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-white text-center">
          Intern Activity History
        </h1>
        <h3 className="text-center text-blue-400 mb-6">The data will be updated when new activity gets added.</h3>

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
                        className="px-6 py-3 text-left text-xs font-semibold text-blue-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <tr
                      key={activity.id || index}
                      className="hover:bg-gray-800 transition-colors duration-150 ease-in-out"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {activity.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {activity.branch}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {activity.activities}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {activity.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {activity.time}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-6 text-center text-sm text-gray-400 italic"
                    >
                      No activities found yet
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
