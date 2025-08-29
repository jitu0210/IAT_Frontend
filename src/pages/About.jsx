import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const [activeSection, setActiveSection] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "mission", label: "Mission" },
    { id: "values", label: "Values" },
    { id: "verticals", label: "Verticals" },
    { id: "advantages", label: "Advantages" },
    { id: "clients", label: "Clients" }
  ];

  const isSectionVisible = (sectionId) => {
    return activeSection === "all" || activeSection === sectionId;
  };

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 text-white flex flex-col min-h-screen">
      <Header />

      {/* Section Navigation */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 py-2 shadow-xl" : "bg-gray-900/90 py-3"} backdrop-blur-md border-b border-gray-800`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <button
              onClick={() => setActiveSection("all")}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                activeSection === "all" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Show All
            </button>
            
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                  activeSection === section.id 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section - Always Visible */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-blue-900/30 to-purple-900/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-2xl md:blur-3xl"></div>
          <div className="absolute bottom-5 md:bottom-10 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-2xl md:blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Aartech Solonics</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl md:max-w-4xl mx-auto leading-relaxed font-light">
            Pioneering excellence in electronics and electrical solutions for over three decades, 
            empowering industries with innovative technologies and sustainable energy solutions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section 
        id="overview" 
        className={`py-16 md:py-24 transition-all duration-500 ${isSectionVisible("overview") ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 md:mr-4"></div>
                <span className="text-blue-400 font-semibold tracking-wide text-xs md:text-sm">OUR JOURNEY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white tracking-tight">Our Story</h2>
              <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                Aartech Solonics Limited (formerly known as Aartech Energies Limited) is a leading technology company 
                providing solutions in power electronics, automation, energy management, and manufacturing. 
                Established in 1987, we've grown from a small entrepreneurial venture to a respected name 
                in the industry with a pan-India presence and global aspirations.
              </p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                Our journey reflects our commitment to innovation, quality, and customer satisfaction. 
                We take pride in our ability to adapt to changing market dynamics while maintaining our 
                core values of integrity and excellence. Listed on the Bombay Stock Exchange (BSE: 524120), 
                we continue to expand our capabilities and market reach.
              </p>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 h-64 md:h-80 flex items-center justify-center transform transition-all duration-500 hover:scale-105">
                <div className="text-center relative z-10">
                  <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">35+</div>
                  <div className="text-xl md:text-2xl text-gray-300 font-light">Years of Excellence</div>
                  <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section 
        id="mission" 
        className={`py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black transition-all duration-500 ${isSectionVisible("mission") ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6">
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 md:mr-4"></div>
              <span className="text-blue-400 font-semibold tracking-wide text-xs md:text-sm">OUR GUIDING PRINCIPLES</span>
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 ml-3 md:ml-4"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Mission & Vision</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl lg:max-w-6xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 h-full transform transition-all duration-300 hover:-translate-y-1">
                <div className="text-cyan-400 text-4xl md:text-5xl mb-6 md:mb-8">🎯</div>
                <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6">Mission</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  To provide innovative, reliable, and sustainable technology solutions that empower 
                  industries to optimize their operations, reduce energy consumption, and enhance productivity. 
                  We strive to exceed expectations through technological excellence, quality products, 
                  and unparalleled customer service.
                </p>
              </div>
            </div>
            
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 h-full transform transition-all duration-300 hover:-translate-y-1">
                <div className="text-blue-400 text-4xl md:text-5xl mb-6 md:mb-8">🔭</div>
                <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-4 md:mb-6">Vision</h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  To be a globally recognized technology company providing innovative solutions in power electronics, 
                  automation, and energy management. We envision a future where our innovations contribute significantly 
                  to sustainable industrial growth, energy conservation, and technological advancement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section 
        id="values" 
        className={`py-16 md:py-24 transition-all duration-500 ${isSectionVisible("values") ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6">
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 md:mr-4"></div>
              <span className="text-blue-400 font-semibold tracking-wide text-xs md:text-sm">OUR FOUNDATION</span>
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 ml-3 md:ml-4"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Core Values</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-5xl lg:max-w-7xl mx-auto">
            {[
              {
                title: "Innovation",
                description: "Continuously pushing boundaries to develop cutting-edge solutions",
                icon: "💡",
                color: "from-cyan-400 to-blue-500"
              },
              {
                title: "Quality",
                description: "Maintaining the highest standards in all our products and services",
                icon: "⭐",
                color: "from-yellow-400 to-orange-400"
              },
              {
                title: "Integrity",
                description: "Building trust through ethical practices and transparency",
                icon: "🤝",
                color: "from-green-400 to-teal-500"
              },
              {
                title: "Customer Focus",
                description: "Putting our clients' needs at the center of everything we do",
                icon: "👥",
                color: "from-blue-400 to-indigo-500"
              },
              {
                title: "Sustainability",
                description: "Committing to environmentally responsible business practices",
                icon: "🌱",
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Excellence",
                description: "Striving for perfection in execution and delivery",
                icon: "🏆",
                color: "from-purple-400 to-pink-500"
              }
            ].map((value, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl blur"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-center h-full group-hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${value.color} text-white text-2xl md:text-3xl mb-4 md:mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className={`text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>{value.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Verticals */}
      <section 
        id="verticals" 
        className={`py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black transition-all duration-500 ${isSectionVisible("verticals") ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6">
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 md:mr-4"></div>
              <span className="text-blue-400 font-semibold tracking-wide text-xs md:text-sm">OUR BUSINESS VERTICALS</span>
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 ml-3 md:ml-4"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Our Business Verticals</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl lg:max-w-6xl mx-auto">
            {[
              {
                title: "Power Electronics",
                description: "Designing and manufacturing advanced power conversion and control systems for industrial applications",
                features: ["UPS Systems", "Power Supplies", "Converters & Inverters", "Custom Solutions"],
                color: "from-cyan-500 to-blue-600"
              },
              {
                title: "Automation Solutions",
                description: "Providing cutting-edge industrial automation and control systems to enhance operational efficiency",
                features: ["PLC Systems", "SCADA Solutions", "Process Control", "IoT Integration"],
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "Energy Management",
                description: "Offering comprehensive energy audit and optimization services for sustainable operations",
                features: ["Energy Audits", "Power Quality Solutions", "Conservation Systems", "Solar Integration"],
                color: "from-green-500 to-teal-600"
              },
              {
                title: "Manufacturing Services",
                description: "Electronic manufacturing services with state-of-the-art facilities and quality processes",
                features: ["PCB Assembly", "Product Design", "Prototyping", "Testing & Validation"],
                color: "from-purple-500 to-pink-600"
              }
            ].map((vertical, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 h-full transform transition-all duration-300 hover:-translate-y-1">
                  <h3 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r ${vertical.color} bg-clip-text text-transparent`}>{vertical.title}</h3>
                  <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-base md:text-lg">{vertical.description}</p>
                  <ul className="space-y-3 md:space-y-4">
                    {vertical.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className={`bg-gradient-to-r ${vertical.color} bg-clip-text text-transparent font-semibold mr-2 md:mr-3 text-lg md:text-xl`}>•</span>
                        <span className="text-gray-300 text-base md:text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        id="advantages" 
        className={`py-16 md:py-24 transition-all duration-500 ${isSectionVisible("advantages") ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6">
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 md:mr-4"></div>
              <span className="text-blue-400 font-semibold tracking-wide text-xs md:text-sm">OUR ADVANTAGE</span>
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 ml-3 md:ml-4"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Why Choose Aartech Solonics</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl lg:max-w-6xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 h-full transform transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-6 md:mb-8 flex items-center">
                  <svg className="w-5 h-5 md:w-7 md:h-7 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Our Strengths
                </h3>
                <ul className="space-y-3 md:space-y-4 lg:space-y-5">
                  {[
                    "35+ years of industry experience and expertise",
                    "Strong R&D focus with continuous innovation",
                    "Comprehensive product portfolio and solutions",
                    "Pan-India presence with robust support network",
                    "Quality certifications and industry recognition",
                    "Dedicated team of skilled professionals",
                    "Proven track record with 1000+ clients",
                    "End-to-end solutions from design to implementation"
                  ].map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1 flex-shrink-0 text-lg md:text-xl">✓</span>
                      <span className="text-gray-300 text-base md:text-lg">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative group mt-8 md:mt-0">
              <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8 lg:p-10 h-full transform transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-6 md:mb-8 flex items-center">
                  <svg className="w-5 h-5 md:w-7 md:h-7 mr-2 md:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  Quality Certifications
                </h3>
                <ul className="space-y-3 md:space-y-4 lg:space-y-5">
                  {[
                    "ISO 9001:2015 Certified Quality Management",
                    "ISO 14001:2015 Environmental Management",
                    "ISO 45001:2018 Occupational Health & Safety",
                    "CE Marking for European Standards Compliance",
                    "ROHS Compliance for Environmental Safety",
                    "BIS Certification for Relevant Products",
                    "Startup India Recognized Innovation",
                    "MSME Registered Manufacturing Unit"
                  ].map((certification, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-3 mt-1 flex-shrink-0 text-lg md:text-xl">•</span>
                      <span className="text-gray-300 text-base md:text-lg">{certification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section 
        id="clients" 
        className={`py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black transition-all duration-500 ${isSectionVisible("clients") ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6">
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mr-3 md:mr-4"></div>
              <span className="text-blue-400 font-semibold tracking-wide text-xs md:text-sm">OUR CLIENTS</span>
              <div className="w-10 md:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 ml-3 md:ml-4"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Trusted By Industry Leaders</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl md:max-w-3xl mx-auto">
              We proudly serve clients across diverse sectors with our innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-4xl md:max-w-5xl mx-auto">
            {[
              "Manufacturing",
              "Healthcare",
              "IT & Telecom",
              "Education",
              "Government",
              "Energy & Utilities",
              "Infrastructure",
              "Defense"
            ].map((sector, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg md:rounded-xl p-4 md:p-6 text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                <div className="text-gray-300 text-sm md:text-base lg:text-lg font-medium">{sector}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;