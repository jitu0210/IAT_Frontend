import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-8 bg-black">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-blue-400">Aartech Solonics</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneering excellence in electronics and electrical solutions for over three decades, 
            empowering industries with innovative technologies.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Established in 1987, Aartech Solonics Limited has emerged as a leading 
                provider of specialized electronics and electrical solutions. From our 
                beginnings as a small entrepreneurial venture, we've grown into a 
                respected name in the industry with a pan-India presence.
              </p>
              <p className="text-gray-300">
                Our journey reflects our commitment to innovation, quality, and customer 
                satisfaction. We take pride in our ability to adapt to changing market 
                dynamics while maintaining our core values of integrity and excellence.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">30+</div>
                <div className="text-xl text-gray-300">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Mission & Vision</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-md">
              <div className="text-cyan-400 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Mission</h3>
              <p className="text-gray-300">
                To deliver innovative, reliable, and sustainable solutions that empower 
                our clients to achieve their operational goals. We strive to exceed 
                expectations through technological excellence, quality products, and 
                unparalleled customer service.
              </p>
            </div>
            
            <div className="bg-black border border-gray-800 rounded-2xl p-8 shadow-md">
              <div className="text-blue-400 text-4xl mb-4">🔭</div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Vision</h3>
              <p className="text-gray-300">
                To be the preferred partner for industry-leading solutions in power electronics, 
                automation, and energy management. We envision a future where our innovations 
                contribute significantly to sustainable industrial growth and technological advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Continuously pushing boundaries to develop cutting-edge solutions",
                icon: "💡",
                color: "text-cyan-400"
              },
              {
                title: "Quality",
                description: "Maintaining the highest standards in all our products and services",
                icon: "⭐",
                color: "text-yellow-400"
              },
              {
                title: "Integrity",
                description: "Building trust through ethical practices and transparency",
                icon: "🤝",
                color: "text-green-400"
              },
              {
                title: "Customer Focus",
                description: "Putting our clients' needs at the center of everything we do",
                icon: "👥",
                color: "text-blue-400"
              },
              {
                title: "Sustainability",
                description: "Committing to environmentally responsible business practices",
                icon: "🌱",
                color: "text-green-500"
              },
              {
                title: "Excellence",
                description: "Striving for perfection in execution and delivery",
                icon: "🏆",
                color: "text-purple-400"
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
                <div className={`text-4xl mb-4 ${value.color}`}>{value.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${value.color}`}>{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Business Verticals</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Power Electronics",
                description: "Designing and manufacturing advanced power conversion and control systems for industrial applications",
                features: ["UPS Systems", "Power Supplies", "Converters & Inverters"]
              },
              {
                title: "Automation Solutions",
                description: "Providing cutting-edge industrial automation and control systems to enhance operational efficiency",
                features: ["PLC Systems", "SCADA Solutions", "Process Control"]
              },
              {
                title: "Energy Management",
                description: "Offering comprehensive energy audit and optimization services for sustainable operations",
                features: ["Energy Audits", "Power Quality Solutions", "Conservation Systems"]
              },
              {
                title: "Custom Engineering",
                description: "Developing bespoke solutions tailored to specific client requirements and challenges",
                features: ["Product Design", "Prototyping", "Testing & Validation"]
              }
            ].map((vertical, index) => (
              <div key={index} className="bg-black border border-gray-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{vertical.title}</h3>
                <p className="text-gray-300 mb-6">{vertical.description}</p>
                <ul className="space-y-2">
                  {vertical.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">Why Choose Aartech Solonics</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Our Strengths</h3>
              <ul className="space-y-4">
                {[
                  "Three decades of industry experience and expertise",
                  "Strong R&D focus with continuous innovation",
                  "Comprehensive product portfolio and solutions",
                  "Pan-India presence with robust support network",
                  "Quality certifications and industry recognition",
                  "Dedicated team of skilled professionals"
                ].map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Quality Certifications</h3>
              <ul className="space-y-4">
                {[
                  "ISO 9001:2015 Certified Quality Management",
                  "ISO 14001:2015 Environmental Management",
                  "ISO 45001:2018 Occupational Health & Safety",
                  "CE Marking for European Standards Compliance",
                  "ROHS Compliance for Environmental Safety",
                  "BIS Certification for Relevant Products"
                ].map((certification, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300">{certification}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;