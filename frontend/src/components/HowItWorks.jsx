import React from "react";

const steps = [
  {
    id: 1,
    title: "Book Your Move",
    description:
      "Schedule your move online or by phone — choose your preferred date, time, and type of service that suits your needs.",
    icon: "https://cdn-icons-png.flaticon.com/512/3199/3199871.png",
  },
  {
    id: 2,
    title: "Packing & Loading",
    description:
      "Our expert team arrives on time, packs your items carefully using high-quality materials, and loads them securely.",
    icon: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  },
  {
    id: 3,
    title: "Transportation",
    description:
      "We transport your belongings safely with GPS-tracked vehicles and experienced drivers for peace of mind.",
    icon: "https://cdn-icons-png.flaticon.com/512/1067/1067566.png",
  },
  {
    id: 4,
    title: "Unloading & Setup",
    description:
      "Once we arrive, we unload and help you settle in — unpacking and placing items exactly where you want them.",
    icon: "https://cdn-icons-png.flaticon.com/512/1584/1584893.png",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[var(--cream)] mt-20 md:mt-28 py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[var(--brown)] mb-4">
          How <span className="text-[var(--light-brown)]">It Works</span>
        </h2>
        <p className="text-[var(--brown)] text-lg max-w-2xl mx-auto mb-12">
          We make moving simple and stress-free — just follow these easy steps and
          let our team handle the rest with care and professionalism.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <img
                src={step.icon}
                alt={step.title}
                className="w-20 h-20 mb-6 transition-transform duration-300 hover:scale-110"
              />
              <h3 className="text-xl font-semibold text-[var(--brown)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--brown)] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
