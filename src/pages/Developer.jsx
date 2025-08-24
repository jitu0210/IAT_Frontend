import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  },
];

export default function Developers() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-8 bg-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4">
            Meet Our Developers
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Our talented team of frontend and backend developers crafted this
            platform with cutting-edge technologies, ensuring performance,
            responsiveness, and a seamless user experience.
          </p>
        </div>
      </section>

      {/* Developer Cards */}
      <section className="flex-grow py-5">
        <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-2">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-md hover:shadow-blue-500/30 transition"
            >
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                {dev.role}
              </h2>
              <h3 className="text-xl font-semibold text-white mb-4">
                {dev.name}
              </h3>

              <div className="mb-4">
                <p className="text-gray-400 font-medium mb-1">Skills:</p>
                <ul className="list-disc list-inside text-gray-300">
                  {dev.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400 font-medium">Email:</p>
                <a
                  href={`mailto:${dev.email}`}
                  className="text-blue-400 hover:underline"
                >
                  {dev.email}
                </a>
                <p className="text-gray-400 font-medium">Phone:</p>
                <a
                  href={`tel:${dev.phone.replace(/\s+/g, "")}`}
                  className="text-blue-400 hover:underline"
                >
                  {dev.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Contact */}
      <section className="bg-black py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-gray-300 text-lg mb-2">
            For any queries, suggestions, or collaboration opportunities, reach
            out to our developers directly:
          </p>
          <p>
            <a
              href="mailto:support@company.com"
              className="text-blue-400 hover:underline"
            >
              Email: support@company.com
            </a>
          </p>
          <p>
            <a
              href="tel:+919999988888"
              className="text-blue-400 hover:underline"
            >
              Phone: +91 99999 88888
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
