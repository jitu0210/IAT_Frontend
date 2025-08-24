import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    activities: "",
    date: new Date(),
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [nextSubmissionTime, setNextSubmissionTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Check if there's a submission timestamp in localStorage
    const lastSubmission = localStorage.getItem("lastSubmissionTime");
    if (lastSubmission) {
      const nextAvailableTime = new Date(parseInt(lastSubmission) + 12 * 60 * 60 * 1000);
      setNextSubmissionTime(nextAvailableTime);
    }

    // Get user info from token
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.userId, name: decoded.name });
      
      // Pre-fill the name field with the logged-in user's name
      if (decoded.name) {
        setFormData(prev => ({ ...prev, name: decoded.name }));
      }
    } catch (err) {
      console.error("Token decoding error:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please log in to submit the form");
      navigate("/login");
      return;
    }
    
    // Check if 12 hours have passed since last submission
    const lastSubmission = localStorage.getItem("lastSubmissionTime");
    if (lastSubmission) {
      const nextAvailableTime = new Date(parseInt(lastSubmission) + 12 * 60 * 60 * 1000);
      if (new Date() < nextAvailableTime) {
        setNextSubmissionTime(nextAvailableTime);
        return;
      }
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/v1/form/submit-form",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Store submission timestamp
      const submissionTime = new Date().getTime();
      localStorage.setItem("lastSubmissionTime", submissionTime);
      setNextSubmissionTime(new Date(submissionTime + 12 * 60 * 60 * 1000));
      
      setSubmitted(true);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Submission failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Authentication Required
            </h2>
            <p className="text-gray-400">Please log in to submit the form.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-gray-900 max-w-xl w-full p-8 rounded-lg shadow-lg border border-blue-900/30">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/30 border border-green-700/30">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-medium text-center text-blue-400 mb-2">
              Your response has been recorded
            </h2>
            
            <p className="text-center text-gray-400 mb-6">
              Thank you for submitting your activities. You can submit another response after 12 hours.
            </p>
            
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-md p-4 mb-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-300">
                  Next submission available: {nextSubmissionTime ? nextSubmissionTime.toLocaleString() : '12 hours from now'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: user.name,
                    branch: "",
                    activities: "",
                    date: new Date(),
                  });
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <div className="flex-grow flex justify-center py-10 px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gray-900 rounded-lg shadow-lg border border-blue-900/30 p-8 mb-4">
            <h1 className="text-2xl font-medium text-blue-400 mb-2">
              Intern Activity Tracker
            </h1>
            <p className="text-gray-400 text-sm">Track daily activities of interns.</p>
            <div className="mt-4 h-1 w-16 bg-blue-600 rounded-full"></div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-lg shadow-lg border border-blue-900/30 p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500 outline-none p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500 outline-none p-2"
              >
                <option value="" className="bg-gray-800">Select Branch</option>
                <option value="CSE" className="bg-gray-800">CSE</option>
                <option value="Mechanical" className="bg-gray-800">Mechanical</option>
                <option value="Electrical" className="bg-gray-800">Electrical</option>
                <option value="Electronics" className="bg-gray-800">Electronics</option>
                <option value="MBA" className="bg-gray-800">MBA</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Activities <span className="text-red-500">*</span>
              </label>
              <textarea
                name="activities"
                rows="4"
                value={formData.activities}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500 outline-none p-2 resize-none"
                placeholder="Describe your activities today..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-md border border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-blue-500 outline-none p-2"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded font-medium transition bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          
          {nextSubmissionTime && new Date() < nextSubmissionTime && (
            <div className="mt-4 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 text-center">
              <p className="text-blue-300">
                You can submit your next response after {nextSubmissionTime.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}