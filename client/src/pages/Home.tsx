import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import VerticalsSection from '@/components/VerticalsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ParticleBackground from '@/components/ParticleBackground';

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
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
      {/* Fondo de partículas para toda la página */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground 
          density={140} 
          glowEffect={true} 
          connectLines={true}
        />
      </div>
      
      <SEOHead 
        title="Jose Bustos - Experto en IA y Automatización para Empresas"
        description="Automatiza, escala y gana con soluciones personalizadas de IA y automatización. Desarrollo agentes inteligentes, automatizaciones avanzadas y sistemas que facturan más para tu empresa."
        keywords="Jose Bustos, IA, automatización, inteligencia artificial, agentes de voz, desarrollo web, chatbots, automatización empresarial, n8n, Make, OpenAI, Vapi"
        canonical="https://bustos.innovapymes.ai/"
      />
      
      {/* Contenido con z-index mayor para estar sobre las partículas */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VerticalsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
