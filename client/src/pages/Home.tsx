import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import VerticalsSection from '@/components/VerticalsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('visible');
        }
      });
      
      // Parallax effect
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const speed = 0.05;
        (element as HTMLElement).style.transform = `translateY(-${scrollPosition * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check for elements in viewport
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <VerticalsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
