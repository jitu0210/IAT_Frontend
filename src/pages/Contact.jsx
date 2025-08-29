import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Contact data with additional fields for more professional look
const contacts = [
  {
    title: "HR Department",
    subtitle: "Human Resources & Recruitment",
    color: "from-blue-600 to-cyan-600",
    acronym: "SAY",
    email: "demo@hrmail.com",
    phone: "+91 98XXX XXXXX",
    office: "Aartech Solonics Limited, Mandideep, India",
    availability: "Mon-Fri, 9:00 AM - 5:30 PM",
    image: "",
  },
  {
    title: "Coordination Team",
    subtitle: "Project Coordination & Support",
    color: "from-purple-600 to-blue-600",
    acronym: "MST",
    email: "coordinator@company.com",
    phone: "+91 91XXX XXXXX",
    office: "Aartech Solonics Limited, Mandideep, India",
    availability: "Mon-Sat, 8:00 AM - 6:00 PM",
    image: "",
  },
];

// Additional team members for expanded contact options
const teamMembers = [
  {
    name: "Technical Support",
    role: "IT & Infrastructure",
    email: "tech@company.com",
    phone: "+91 90XXX XXXXX",
  },
  {
    name: "Accounts Department",
    role: "Billing & Finance",
    email: "accounts@company.com",
    phone: "+91 97XXX XXXXX",
  },
];

const Contact = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: "general",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      department: "general",
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white flex flex-col min-h-screen">
      <Header />

      {/* Hero Section with improved design */}
      <section className="relative py-10 bg-gradient-to-r from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 z-0"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our dedicated teams are here to assist you with queries, support,
            and guidance. Reach out to the right department for prompt assistance.
          </p>
          
          {/* Navigation Tabs */}
          <div className="inline-flex rounded-xl bg-gray-800 p-1 mb-2">
            <button
              onClick={() => setActiveTab("contact")}
              className={`py-2 px-6 rounded-xl transition-all ${
                activeTab === "contact" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg" 
                  : "hover:bg-gray-700"
              }`}
            >
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`py-2 px-6 rounded-xl transition-all ${
                activeTab === "form" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg" 
                  : "hover:bg-gray-700"
              }`}
            >
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`py-2 px-6 rounded-xl transition-all ${
                activeTab === "team" 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg" 
                  : "hover:bg-gray-700"
              }`}
            >
              Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-6">
          
          {/* Contact Cards Section */}
          {activeTab === "contact" && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl overflow-hidden transition-all duration-500 transform ${
                    hoveredCard === index ? "translate-y-[-5px] shadow-2xl" : ""
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated gradient accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${contact.color} ${hoveredCard === index ? "animate-pulse" : ""}`}></div>
                  
                  {/* Header with icon */}
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{contact.image}</div>
                    <div>
                      <h2 className={`text-2xl font-bold bg-gradient-to-r ${contact.color} bg-clip-text text-transparent`}>
                        {contact.title}
                      </h2>
                      <p className="text-gray-400 text-sm">{contact.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-700 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Acronym</p>
                        <p className="font-medium group-hover:text-blue-300 transition-colors duration-300">{contact.acronym}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-700 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="font-medium text-blue-400 hover:text-cyan-400 transition-colors duration-300 group-hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-700 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <a
                          href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                          className="font-medium text-blue-400 hover:text-cyan-400 transition-colors duration-300 group-hover:underline"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-700 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Office</p>
                        <p className="font-medium group-hover:text-blue-300 transition-colors duration-300">{contact.office}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start group">
                      <div className="bg-gray-700 p-3 rounded-lg mr-4 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-cyan-700 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Availability</p>
                        <p className="font-medium group-hover:text-blue-300 transition-colors duration-300">{contact.availability}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact Form Section */}
          {activeTab === "form" && (
            <div className="max-w-2xl mx-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl mb-16">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-300 transition-colors">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-300 transition-colors">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-300 transition-colors">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-300 transition-colors">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="hr">Human Resources</option>
                      <option value="coordinator">Coordination</option>
                      <option value="technical">Technical Support</option>
                      <option value="accounts">Accounts & Billing</option>
                    </select>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-blue-300 transition-colors">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-medium text-white shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Team Members Section */}
          {activeTab === "team" && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-center">
                Additional Contacts
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">{member.name}</h3>
                    <p className="text-gray-400 mb-4">{member.role}</p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${member.email}`} className="text-blue-400 hover:text-cyan-400 transition-colors">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="text-blue-400 hover:text-cyan-400 transition-colors">
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Queries */}
          <div className="mt-16 p-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              General Inquiries
            </h3>
            <p className="text-gray-300 mb-4">
              For other queries, please email us at{" "}
              <a
                href="mailto:support@company.com"
                className="text-blue-400 hover:text-cyan-400 hover:underline font-medium transition-colors"
              >
                support@company.com
              </a>
            </p>
            <div className="flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>We typically respond within 24 hours on business days.</span>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Location</h3>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.310477294888!2d77.4976644758711!3d23.26806537892056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c41ddfb329d2d%3A0x91c14d43a2a5d6f1!2sAARTECH%20SOLONICS%20LIMITED!5e0!3m2!1sen!2sin!4v1692261234567"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aartech Solonics Location"
                className="block"
              ></iframe>
            </div>
            <div className="mt-4 text-center text-gray-400">
              <p>Visit us at our corporate office in Mandideep</p>
              <p className="text-sm mt-1">Open Monday to Friday, 9:00 AM to 5:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;