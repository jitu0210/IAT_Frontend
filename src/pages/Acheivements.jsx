import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const achievements = [
  {
    title: "Entry into Middle East Market",
    description:
      "Secured a strategic order from Qatar to supply Current Limiting Protectors (CLP), marking its foray into the Middle East energy market.",
    link: "https://m.economictimes.com/industry/indl-goods/svs/engineering/aartech-solonics-bags-order-to-supply-current-limiting-protectors-from-qatar/articleshow/122338045.cms",
  },
  {
    title: "ISO 9001:2015 Certification",
    description:
      "Aartech Solonics proudly holds the ISO 9001:2015 certification, affirming its commitment to quality management systems.",
    link: "https://aartechsolonics.com/media",
  },
  {
    title: "DSIR Recognition",
    description:
      "Recognized by the Department of Scientific & Industrial Research, Government of India, for its contributions to industrial research.",
    link: "https://aartechsolonics.com/media",
  },
  {
    title: "Atal Innovation Mission",
    description:
      "Selected to establish and host a Startup Incubation Centre, fostering innovation and entrepreneurship.",
    link: "https://aartechsolonics.com/media",
  },
  {
    title: "Adaptive Alternate Power Module (AAPM)",
    description:
      "In collaboration with Sudarshan Chakra Corps (EME) and IIT Mumbai, developed the Adaptive Alternate Power Module for defense applications.",
    link: "https://economictimes.indiatimes.com/aartech-solonics-ltd/stocksupdate/companyid-1851911.cms",
  },
  {
    title: "FESS Solar Carport",
    description:
      "Introduced the FESS Solar Carport, a remote, grid-light, solar-ready EV fast charging station with 25-year service life.",
    link: "https://aartechsolonics.us/",
  },
];

export default function Achievements() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-12 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Aartech Solonics Limited Achievements
          </h1>
          <p className="text-blue-400 text-lg md:text-xl">
            Celebrating the milestones, innovations, and recognitions of Aartech Solonics Limited.
          </p>
        </div>
      </section>

      {/* Achievements List */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2">
          {achievements.map((achieve, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-md hover:shadow-blue-500/30 transition"
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-2">{achieve.title}</h3>
              <p className="text-gray-300 mb-4">{achieve.description}</p>
              <a
                href={achieve.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}