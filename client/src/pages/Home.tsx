import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import VerticalsSection from '@/components/VerticalsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

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
      <SEOHead 
        title="Innovapymes - Soluciones de IA y Automatización para PyMEs"
        description="Transformamos tu negocio con soluciones de IA personalizadas: SaaS, automatización web, chatbots inteligentes y marketing digital para restaurantes, salones, gimnasios, inmobiliarias y más."
        keywords="IA, automatización, inteligencia artificial, SaaS, desarrollo web, chatbots, marketing digital, restaurantes, salones de belleza, estudios de tatuajes, gimnasios, inmobiliarias, PyMEs"
        canonical="https://innovapymes.com/"
      />
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
