import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const achievements = [

  {
    title: "Entry into Middle East Market",
    description:
      "Secured a strategic order from Qatar to supply Current Limiting Protectors (CLP), marking its foray into the Middle East energy market.",
    link: "https://m.economictimes.com/industry/indl-goods/svs/engineering/aartech-solonics-bags-order-to-supply-current-limiting-protectors-from-qatar/articleshow/122338045.cms",
    year: "2024",
    category: "Business Expansion",
  },
  {
    title: "ISO 9001:2015 Certification",
    description:
      "Aartech Solonics proudly holds the ISO 9001:2015 certification, affirming its commitment to quality management systems.",
    link: "https://aartechsolonics.com/media",
    year: "2023",
    category: "Quality Certification",
  },
  {
    title: "DSIR Recognition",
    description:
      "Recognized by the Department of Scientific & Industrial Research, Government of India, for its contributions to industrial research.",
    link: "https://aartechsolonics.com/media",
    year: "2023",
    category: "Government Recognition",
  },
  {
    title: "Atal Innovation Mission",
    description:
      "Selected to establish and host a Startup Incubation Centre, fostering innovation and entrepreneurship.",
    link: "https://aartechsolonics.com/media",
    year: "2022",
    category: "Innovation",
  },
  {
    title: "Adaptive Alternate Power Module (AAPM)",
    description:
      "In collaboration with Sudarshan Chakra Corps (EME) and IIT Mumbai, developed the Adaptive Alternate Power Module for defense applications.",
    link: "https://economictimes.indiatimes.com/aartech-solonics-ltd/stocksupdate/companyid-1851911.cms",
    year: "2022",
    category: "Defense Technology",
  },
  {
    title: "FESS Solar Carport",
    description:
      "Introduced the FESS Solar Carport, a remote, grid-light, solar-ready EV fast charging station with 25-year service life.",
    link: "https://aartechsolonics.us/",
    year: "2021",
    category: "Sustainable Technology",
  },
];

export default function Achievements() {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(achievements.map((item) => item.category)),
  ];

  const filteredAchievements =
    activeCategory === "All"
      ? achievements
      : achievements.filter((achieve) => achieve.category === activeCategory);

  useEffect(() => {
    const timer = setTimeout(() => {
      filteredAchievements.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Enhanced Hero Section with Parallax Effect */}
      <section className="relative py-10 text-center bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900 opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-6 inline-flex items-center justify-center px-4 py-2 bg-blue-900 bg-opacity-30 rounded-full text-blue-300 text-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Celebrating Excellence
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Achievements
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Celebrating the milestones, innovations, and recognitions that
            define our journey of excellence at Aartech Solonics Limited.
          </p>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8"></div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-blue-500 opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 rounded-full bg-cyan-500 opacity-30 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-20 w-3 h-3 rounded-full bg-blue-400 opacity-40 animate-ping"></div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-900 sticky top-16 z-20 shadow-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCards([]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-16 flex-grow relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-900 h-full opacity-30 hidden lg:block"></div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Milestone{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Timeline
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our journey of innovation and excellence through the years
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {filteredAchievements.map((achieve, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 transform ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute top-6 -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-4 border-gray-900 z-10 shadow-lg"></div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-l-4 border-cyan-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 h-full group relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute right-0 top-0 opacity-10">
                    <svg width="150" height="150" viewBox="0 0 100 100">
                      <path
                        fill="cyan"
                        d="M92.5,90.9c-8.2,5.3-17.7,8.1-27.5,8.1c-26.2,0-47.5-21.3-47.5-47.5c0-9.8,2.9-19.3,8.4-27.4L92.5,90.9z"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <span className="text-xs font-semibold text-cyan-300 bg-cyan-900 bg-opacity-30 px-2 py-1 rounded-full mb-2 inline-block">
                        {achieve.category}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {achieve.title}
                      </h3>
                    </div>
                    <span className="text-sm font-bold text-cyan-300 bg-gray-800 px-3 py-1 rounded-full min-w-[60px] text-center">
                      {achieve.year}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 relative z-10">
                    {achieve.description}
                  </p>
                  <a
                    href={achieve.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group-hover:underline relative z-10"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              By The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Numbers
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Quantifying our impact and growth over the years
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-cyan-500 transition-colors">
              <div className="text-4xl font-bold text-cyan-400 mb-2">6+</div>
              <div className="text-gray-300">Major Achievements</div>
            </div>
            <div className="p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-cyan-500 transition-colors">
              <div className="text-4xl font-bold text-cyan-400 mb-2">10+</div>
              <div className="text-gray-300">Countries Served</div>
            </div>
            <div className="p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-cyan-500 transition-colors">
              <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-cyan-500 transition-colors">
              <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
              <div className="text-gray-300">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Us on Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Journey
            </span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of our story as we continue to innovate and achieve new
            milestones in energy technology and beyond.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
              Explore Careers
            </button> */}
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-gray-800 text-gray-200 rounded-lg font-medium hover:bg-gray-700 transition-all border border-gray-700"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
