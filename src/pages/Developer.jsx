import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Import avatar images from assets folder
import AmanAvatar from "../assets/aman-avatar.jpg";
import JituAvatar from "../assets/jitu-avatar.jpg";

const developers = [
  {
    role: "Frontend Developer",
    name: "Aman Tiwary",
    skills: [
      "React",
      "Tailwind CSS",
      "Axios",
      "Responsive Design",
      "REST API Integration",
      "JavaScript",
      "HTML & CSS",
    ],
    email: "aman.tiwary@example.com",
    phone: "+91 98765 12345",
    avatar: AmanAvatar,
  },
  {
    role: "Backend Developer",
    name: "Jitu Kumar",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB & Mongoose",
      "REST API",
      "CORS",
      "Bcrypt",
      "Authentication & Authorization",
    ],
    email: "jitukumar63766@gmail.com",
    phone: "+91 91234 56789",
    avatar: JituAvatar,
  },
];

export default function Developers() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 md:mb-6">
            Meet Our Development Team
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Our talented team of developers crafted this platform with
            cutting-edge technologies, ensuring performance, responsiveness, and
            a seamless user experience.
          </p>
        </div>
      </section>

      {/* Developer Cards */}
      <section className="flex-grow py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:gap-8 md:gap-12 grid-cols-1 md:grid-cols-2">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 border border-gray-700 shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-blue-500/10 rounded-full -translate-y-8 sm:-translate-y-10 md:-translate-y-16 translate-x-8 sm:translate-x-10 md:translate-x-16 blur-xl"></div>

              <div className="flex items-start mb-6 flex-col sm:flex-row sm:items-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-1 rounded-full mr-0 sm:mr-4 mb-4 sm:mb-0 flex-shrink-0">
                  <div className="bg-gray-800 rounded-full w-14 h-14 sm:w-16 sm:h-16 overflow-hidden">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-blue-400 mb-1">
                    {dev.role}
                  </h2>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                    {dev.name}
                  </h3>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-400 text-sm sm:text-base font-medium mb-3 border-b border-gray-700 pb-2">
                  Core Technologies:
                </p>
                <div className="flex flex-wrap gap-2">
                  {dev.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-xs sm:text-sm text-blue-300 px-2 sm:px-3 py-1 rounded-full border border-gray-700 break-words"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">
                    Email:
                  </p>
                  <a
                    href={`mailto:${dev.email}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-xs sm:text-sm md:text-base break-all"
                    aria-label={`Email ${dev.name}`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    {dev.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm font-medium mb-1">
                    Phone:
                  </p>
                  <a
                    href={`tel:${dev.phone.replace(/\s+/g, "")}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center text-xs sm:text-sm md:text-base"
                    aria-label={`Call ${dev.name}`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    {dev.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Contact */}
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Get In Touch
          </h3>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            For any queries, suggestions, or collaboration opportunities, reach
            out to our developers directly or use our general contact
            information:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8">
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg md:rounded-xl border border-gray-800 flex-1 max-w-xs mx-auto sm:max-w-none">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-gray-400 mb-2 text-xs sm:text-sm md:text-base">
                Email us at
              </p>
              <a
                href="mailto:support@company.com"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base md:text-lg font-medium break-all"
                aria-label="Email support"
              >
                support@company.com
              </a>
            </div>
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg md:rounded-xl border border-gray-800 flex-1 max-w-xs mx-auto sm:max-w-none">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-3 md:mb-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <p className="text-gray-400 mb-2 text-xs sm:text-sm md:text-base">
                Call us at
              </p>
              <a
                href="tel:+919999988888"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base md:text-lg font-medium"
                aria-label="Call company phone number"
              >
                +91 99999 88888
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
