import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Interns() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch interns from backend
  const fetchInterns = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/all-interns");
      setInterns(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 text-center">
            Our Interns
          </h1>
          <p className="text-gray-300 text-lg mb-12 text-center">
            Meet the talented interns who are contributing to Aartech Solonics Limited.
          </p>

          {loading ? (
            <p className="text-gray-400 text-left">Loading interns...</p>
          ) : error ? (
            <p className="text-red-600 text-left">{error}</p>
          ) : interns.length === 0 ? (
            <p className="text-gray-400 text-left">No interns found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {interns.map((intern) => {
                const createdAt = new Date(intern.createdAt); // from mongoose timestamps
                const formattedDate = createdAt.toLocaleDateString();
                const formattedTime = createdAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={intern._id}
                    className="bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-800 hover:shadow-blue-500/30 transition text-left"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {intern.username}
                    </h3>
                    <p className="text-gray-300 mb-1">
                      <span className="font-semibold">Branch:</span> {intern.branch}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold">Register Date:</span> {formattedDate}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold">Register Time:</span> {formattedTime}
                    </p>
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
