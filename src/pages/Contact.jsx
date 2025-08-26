import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const contacts = [
  {
    title: "HR Contact",
    color: "blue-400",
    acronym: "SAY",
    email: "demo@hrmail.com",
    phone: "+91 98XXX XXXXX",
    office: "Aartech Solonics Limited, Mandideep, India",
  },
  {
    title: "Coordinator Contact",
    color: "blue-400",
    acronym: "MST",
    email: "coordinator@company.com",
    phone: "+91 91XXX XXXXX",
    office: "Aartech Solonics Limited, Mandideep, India",
  },
];

const Contact = () => {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-8 bg-black">
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="text-blue-400">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Our HR and Coordinator are here to assist you with queries, support,
            and guidance. Choose the right contact below.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-5 flex-1">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-md hover:shadow-${contact.color}/30 transition`}
              >
                <h2 className={`text-2xl font-bold text-${contact.color} mb-6`}>
                  {contact.title}
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400">Acronym</p>
                    <p className="font-medium">{contact.acronym}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium text-blue-400 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="font-medium text-blue-400 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400">Office</p>
                    <p className="font-medium">{contact.office}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Queries */}
          <div className="mt-12 text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-200 mb-3">
              General Queries
            </h3>
            <p className="text-gray-400">
              For other queries, please email us at{" "}
              <a
                href="mailto:support@company.com"
                className="text-blue-400 hover:underline"
              >
                support@company.com
              </a>
            </p>
          </div>

          {/* Map Section */}
          <div className="mt-12 w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-gray-800 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.123456789!2d77.412345678!3d23.259345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4c6e6f9d1234%3A0xabcdef1234567890!2sAartech%20Solonics%20Limited!5e0!3m2!1sen!2sin!4v1692261234567!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
              title="Aartech Solonics Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;