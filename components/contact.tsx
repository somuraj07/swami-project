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

  const cardHover = {
    rest: { y: 0, scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
    hover: {
      y: -6,
      scale: 1.02,
      boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* PATTERN BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.10] bg-[url('/grid.svg')] bg-repeat pointer-events-none" />

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-yellow-50 to-white relative"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="text-orange-600 mt-2 text-lg">
          Reach Out for Blessings & Inquiries
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mt-4" />
      </motion.section>

      {/* MAIN SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* FORM CARD */}
          <motion.div
            variants={cardHover}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="backdrop-blur-xl bg-white/80 border border-white/60 shadow-lg hover:shadow-2xl rounded-2xl p-6 md:p-8 transition-all"
          >
            <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-6">
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {["Name", "Email", "Subject"].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-800 mb-1.5">
                    {field} *
                  </label>
                  <input
                    type={field === "Email" ? "email" : "text"}
                    required
                    value={(formData as any)[field.toLowerCase()]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.toLowerCase()]: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-white/70 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all hover:shadow-md"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-white/70 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none resize-none transition-all hover:shadow-md"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 shadow-lg transition-all"
              >
                <Send className="w-4 h-4" /> Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* INFORMATION CARDS */}
          <div className="space-y-8">
            {[
              {
                title: "Visit Us",
                icon: <MapPin className="w-5 h-5 text-orange-500" />,
                content: (
                  <>
                    <p className="font-medium text-gray-900">
                      Sri Avadutha Ramireddy Thatha Samsthan
                    </p>
                    <p className="text-gray-700 mt-1">
                      Kallur Village, Near Kurnool Town,
                      <br />
                      Andhra Pradesh, India
                    </p>
                  </>
                ),
              },
              {
                title: "Email Us",
                icon: <Mail className="w-5 h-5 text-orange-500" />,
                content: (
                  <a
                    href="mailto:info@ramireddythata.org.in"
                    className="text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    info@ramireddythata.org.in
                  </a>
                ),
              },
              {
                title: "Call Us",
                icon: <Phone className="w-5 h-5 text-orange-500" />,
                content: (
                  <a
                    href="tel:+919876543210"
                    className="text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    +91 987 654 3210
                  </a>
                ),
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="p-5 md:p-6 rounded-xl backdrop-blur-xl bg-white/80 border border-white/60 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-3">
                  {card.icon}
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1">
                      {card.title}
                    </h3>
                    {card.content}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* FOLLOW US CARD */}
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="p-5 md:p-6 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="font-serif text-lg font-semibold mb-2">
                Follow Us
              </h3>
              <p className="text-white/90 mb-3">
                Stay connected for live poojas and updates
              </p>

              <a
                href="https://www.youtube.com/channel/UCSY0mLqBwfK2OXKoM80GKAA"
                target="_blank"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Youtube className="w-5 h-5" /> YouTube Channel
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
