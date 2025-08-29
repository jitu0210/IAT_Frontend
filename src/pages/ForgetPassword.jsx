import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />

      <section className="flex-grow flex items-center justify-center py-5 px-5">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl px-8 py-6 w-full max-w-md border border-indigo-700/30 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="mb-4">
              {/* <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div> */}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Forgot Password?
            </h2>
            <p className="text-blue-200 mt-2">We've got a little secret to share...</p>
          </div>

          {!submitted ? (
            <>
              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 px-4 py-3 rounded-lg mb-6 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>We take security seriously! Your password is hashed and even we can't see it.</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-blue-200 text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-blue-900/30 border border-blue-700/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  <p className="text-blue-300 text-sm">We'll pretend to send a reset link</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center group"
                >
                  Send Reset Link
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-900/30 border border-blue-950 rounded-lg">
                <h3 className="text-white font-medium mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Memory Recovery Tips:
                </h3>
                <ul className="text-blue-200 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-700/30 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Think of something you love + your favorite number</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-700/30 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Try that special pattern you always use</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-700/30 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Was it with CAPS lock on or off?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-700/30 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                    <span>Check your memory's "secret" storage area</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 px-4 py-3 rounded-lg mb-6">
                <svg className="w-5 h-5 inline-block mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                We've sent a pretend email to <span className="text-white">{email}</span> with further instructions!
              </div>
              
              <div className="bg-blue-900/20 border border-blue-700/20 text-blue-300 px-4 py-3 rounded-lg mb-6">
                <p className="text-sm">(Just kidding - we can't actually reset your password. But we believe in your memory superpowers!)</p>
              </div>
              
              <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/20 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-2">While you're thinking...</h3>
                <p className="text-blue-200 text-sm mb-3">Did you know the average person has 100 passwords? No wonder we forget them!</p>
                <div className="text-xs text-blue-300/70">Fun fact: The most common password is still "123456" </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-blue-700/30">
            <p className="text-blue-200 text-center">
              Remembered it?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-white font-medium transition-colors duration-300"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}