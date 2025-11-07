import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    feedback:
      "Smart Packers and Movers made my home shifting completely hassle-free. Their team was punctual, careful, and very professional. Highly recommended!",
    image: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
    location: "Delhi, India",
  },
  {
    id: 2,
    name: "Priya Verma",
    feedback:
      "I was worried about moving my fragile items, but their packing quality was top-notch! Everything reached safely without a single scratch.",
    image: "https://cdn-icons-png.flaticon.com/512/194/194935.png",
    location: "Mumbai, India",
  },
  {
    id: 3,
    name: "Amit Patel",
    feedback:
      "Excellent service from start to finish. The team handled everything — from packing to unpacking — with total professionalism.",
    image: "https://cdn-icons-png.flaticon.com/512/194/194931.png",
    location: "Ahmedabad, India",
  },
  {
    id: 4,
    name: "Neha Singh",
    feedback:
      "Affordable, quick, and reliable! The best moving experience I’ve had so far. I’ll definitely choose Smart Packers again for my next move.",
    image: "https://cdn-icons-png.flaticon.com/512/194/194903.png",
    location: "Bangalore, India",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[var(--cream)] mt-20 md:mt-28 py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[var(--brown)] mb-4">
          What Our <span className="text-[var(--light-brown)]">Clients Say</span>
        </h2>
        <p className="text-[var(--brown)] text-lg max-w-2xl mx-auto mb-12">
          We’ve helped thousands of families and businesses move with ease.
          Here’s what our happy customers have to say about their experience.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-[var(--light-brown)] object-cover"
              />
              <h3 className="text-xl font-semibold text-[var(--brown)]">{t.name}</h3>
              <p className="text-sm text-[var(--brown)] opacity-70 mb-3">
                {t.location}
              </p>
              <p className="text-[var(--brown)] text-sm leading-relaxed">
                “{t.feedback}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
