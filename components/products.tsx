"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const products = [
  {
    name: "Fresh Cow Ghee",
    description:
      "Pure and organic cow ghee from our Goshala, prepared with traditional methods for divine offerings and daily use.",
    image: "ghee.jpeg",
  },
  {
    name: "Dung Cakes",
    description:
      "Sacred cow dung cakes for homas, havans, and spiritual rituals. Made from our Goshala cows.",
    image: "dung.jpeg",
  },
  {
    name: "Fresh Desi Milk",
    description:
      "Pure and fresh desi cow milk directly from our Goshala. Rich in nutrients and full of divine blessings.",
    image: "milk.jpg",
  },
];

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white text-center px-50 py-30 md:py-20">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 animate-fade-up">
          Our Products
        </h1>
        <p className="text-base md:text-lg text-orange-600 animate-fade-up delay-100">
          Pure, Organic & Sacred Goods from Our Goshala
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full mt-3 animate-fade-up delay-200" />
      </section>

      {/* Products Section */}
      <section
        ref={sectionRef}
        className={`py-12 md:py-16 px-4 md:px-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-10">
          <p className="font-serif text-lg text-gray-700">
            We provide the freshest and organic goods
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-50/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-sm md:text-base mb-3">
                  {product.description}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-orange-500 font-medium hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> For More Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* Tailwind Animations */}
      <style jsx>{`
        .animate-fade-up {
          opacity: 0;
          transform: translateY(15px);
          animation: fadeUp 0.8s forwards;
        }
        .animate-fade-up.delay-100 {
          animation-delay: 0.1s;
        }
        .animate-fade-up.delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
