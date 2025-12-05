"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Youtube } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! Thank you for contacting us.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white text-center px-4 py-16 md:py-20"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-orange-600">
          Reach Out for Blessings & Inquiries
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mt-3" />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 px-4 md:px-12"
      >
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div variants={item}>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              Send Us A Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all hover:shadow-md resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 shadow-lg transition-all"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item} className="space-y-8">
            {/* Visit Us */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
                Visit Us
              </h3>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Sri Avadutha Ramireddy Thatha Samsthan
                  </p>
                  <p className="text-gray-700">
                    Kallur Village, Near Kurnool Town,
                    <br />
                    Kurnool District, Andhra Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
                Email Us
              </h3>
              <div className="flex gap-4 items-center">
                <Mail className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:info@ramireddythata.org.in"
                  className="text-gray-900 hover:text-orange-500 transition-colors"
                >
                  info@ramireddythata.org.in
                </a>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-6">
                Give Us a Call
              </h3>
              <div className="flex gap-4 items-center">
                <Phone className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-gray-900 hover:text-orange-500 transition-colors"
                >
                  +91 987 654 3210
                </a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 text-white">
              <h3 className="font-serif text-xl font-semibold mb-4">
                Follow Us
              </h3>
              <p className="mb-4">Stay connected for live poojas and updates</p>
              <a
                href="https://www.youtube.com/channel/UCSY0mLqBwfK2OXKoM80GKAA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Youtube className="w-5 h-5" /> YouTube Channel
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
