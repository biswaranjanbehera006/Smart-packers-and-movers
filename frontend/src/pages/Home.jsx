import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <HowItWorks />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
