import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

// Definición del tipo para cada vertical
interface Vertical {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  color: string;
}

const Verticales: React.FC = () => {
  // Lista de verticales con sus datos
  const verticales: Vertical[] = [
    {
      id: 'innovagastro',
      name: 'InnovaGastro',
      description: 'Soluciones tecnológicas para restaurantes, catering y empresas del sector alimentario.',
      image: 'restaurant-line',
      url: 'https://innovagastro.innovapyme.ai',
      color: 'bg-amber-500'
    },
    {
      id: 'innovatattoo',
      name: 'InnovaTattoo',
      description: 'Plataforma para estudios de tatuajes y artistas independientes con gestión de clientes y diseños.',
      image: 'ink-bottle-line',
      url: 'https://innovatattoo.innovapyme.ai',
      color: 'bg-purple-600'
    },
    {
      id: 'innovasalud',
      name: 'InnovaSalud',
      description: 'Sistemas de gestión para clínicas, hospitales y profesionales de la salud.',
      image: 'heart-pulse-line',
      url: 'https://innovasalud.innovapyme.ai',
      color: 'bg-cyan-500'
    },
    {
      id: 'innovaeduca',
      name: 'InnovaEduca',
      description: 'Plataformas educativas para escuelas, universidades y academias de formación.',
      image: 'book-open-line',
      url: 'https://innovaeduca.innovapyme.ai',
      color: 'bg-blue-600'
    },
    {
      id: 'innovafintech',
      name: 'InnovaFintech',
      description: 'Soluciones financieras y bancarias para startups, cooperativas y entidades de crédito.',
      image: 'bank-line',
      url: 'https://innovafintech.innovapyme.ai',
      color: 'bg-emerald-600'
    },
    {
      id: 'innovaretail',
      name: 'InnovaRetail',
      description: 'Tecnología para comercios, tiendas y cadenas de retail con gestión de inventario.',
      image: 'shopping-bag-line',
      url: 'https://innovaretail.innovapyme.ai', 
      color: 'bg-rose-500'
    },
  ];

  // Animaciones para los elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/">
              <div className="text-lg font-bold text-gray-800 flex items-center cursor-pointer">
                <i className="ri-arrow-left-line mr-2"></i>
                Volver al inicio
              </div>
            </Link>
            <div className="text-gray-600">
              <a href="https://innovapyme.ai" className="hover:text-blue-600 transition-colors">
                innovapyme.ai
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-16">
        {/* Título de sección */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestras Verticales</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones tecnológicas especializadas para diferentes sectores y necesidades específicas.
          </p>
        </motion.div>

        {/* Grid de tarjetas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {verticales.map((vertical) => (
            <motion.div 
              key={vertical.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className={`h-24 ${vertical.color} relative flex items-center justify-center`}>
                <i className={`ri-${vertical.image} text-white text-5xl`}></i>
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{vertical.name}</h3>
                <p className="text-gray-600 mb-6 h-12">{vertical.description}</p>
                <a 
                  href={vertical.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full transition-colors"
                >
                  Saber más
                  <i className="ri-arrow-right-line ml-2"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Innovapyme. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Verticales;