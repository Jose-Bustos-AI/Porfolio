import React, { useState, useEffect } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { motion, Variants } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

// Definición del tipo para cada post
interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  video_url?: string;
  created_at: string;
}

const LabsPost: React.FC = () => {
  // Obtener el ID del post desde la URL
  const [match, params] = useRoute('/labs/:id');
  const [, setLocation] = useLocation();
  const postId = params?.id;

  // Estado para almacenar el post
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener el post del archivo JSON
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/posts.json');
        
        if (!response.ok) {
          throw new Error(`Error al cargar los posts: ${response.status}`);
        }
        
        const data = await response.json();
        const foundPost = data.find((p: Post) => p.id === postId);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post no encontrado');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar el post:', err);
        setError('No pudimos cargar el post. Por favor, intenta nuevamente más tarde.');
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Animaciones para los elementos
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030015] text-white overflow-hidden">
      {/* Fondo con partículas */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground id="particle-background" connectLines glowEffect density={30} />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#00EEFF]/10 via-[#BD00FF]/5 to-transparent blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#E65616]/10 via-[#62d957]/5 to-transparent blur-[100px]"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,238,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,255,0.2) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      {/* Header con navegación */}
      <header className="glass sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/labs">
              <div className="text-lg font-bold text-white flex items-center cursor-pointer hover:text-[#E65616] transition-colors duration-300">
                <i className="ri-arrow-left-line mr-2"></i>
                Volver a Labs
              </div>
            </Link>
            <div className="text-white/80">
              <Link href="/">
                <div className="hover:text-[#00EEFF] transition-colors duration-300 cursor-pointer flex items-center">
                  <i className="ri-home-line mr-1"></i>
                  Inicio
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 md:px-8 pt-24 pb-20 relative z-10 max-w-4xl">
        {loading ? (
          // Esqueleto de carga
          <div className="glass rounded-xl p-8 animate-pulse">
            <div className="h-10 bg-[#CCCCCC]/10 rounded-full w-3/4 mb-6"></div>
            <div className="h-4 bg-[#CCCCCC]/10 rounded mb-8 w-1/3"></div>
            <div className="h-80 bg-[#CCCCCC]/10 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-[#CCCCCC]/10 rounded"></div>
              <div className="h-4 bg-[#CCCCCC]/10 rounded"></div>
              <div className="h-4 bg-[#CCCCCC]/10 rounded w-3/4"></div>
              <div className="h-4 bg-[#CCCCCC]/10 rounded w-2/3"></div>
            </div>
          </div>
        ) : error ? (
          // Mensaje de error
          <div className="text-center py-10 glass rounded-xl p-8">
            <i className="ri-error-warning-line text-5xl text-[#E65616] mb-4"></i>
            <h3 className="text-2xl font-bold mb-2">¡Ups! Algo salió mal</h3>
            <p className="text-[#CCCCCC] mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-[#E65616] rounded-full hover:bg-[#E65616]/80 transition-colors"
              >
                Intentar nuevamente
              </button>
              <button 
                onClick={() => setLocation('/labs')} 
                className="px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors"
              >
                Volver a Labs
              </button>
            </div>
          </div>
        ) : post ? (
          <motion.div 
            className="glass rounded-xl overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Imagen grande del post */}
            <div className="relative h-80 md:h-96 w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030015] to-transparent opacity-70 z-10"></div>
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              {/* Fecha en la esquina */}
              <div className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full glass text-sm flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                {formatDate(post.created_at)}
              </div>
            </div>
            
            {/* Contenido del post */}
            <motion.div 
              className="p-8 md:p-10"
              variants={contentVariants}
            >
              <h1 className="text-3xl md:text-4xl font-space font-bold mb-6 text-gradient">
                {post.title}
              </h1>
              
              {/* Video si existe */}
              {post.video_url && (
                <div className="my-8 rounded-xl overflow-hidden relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src={post.video_url} 
                      title={post.title}
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>
              )}
              
              {/* Contenido HTML */}
              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:font-space prose-headings:text-[#E65616] prose-a:text-[#00EEFF] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Botones de acción */}
              <div className="mt-10 flex flex-wrap gap-6 justify-end">
                <Link href="/labs">
                  <motion.div 
                    className="px-6 py-3 glass rounded-full cursor-pointer flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Volver a Labs
                  </motion.div>
                </Link>
                
                <motion.a 
                  href="#share"
                  className="px-6 py-3 rounded-full relative overflow-hidden hover-shine cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    // Función de compartir
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: 'Mira este artículo de Innovapyme Labs',
                        url: window.location.href,
                      });
                    } else {
                      // Copiar al portapapeles si Web Share API no está disponible
                      navigator.clipboard.writeText(window.location.href);
                      alert('Enlace copiado al portapapeles');
                    }
                  }}
                >
                  {/* Fondo con gradiente animado */}
                  <motion.div 
                    className="absolute inset-0 z-0"
                    style={{ 
                      background: 'linear-gradient(90deg, #E65616, #62d957, #E65616)',
                      backgroundSize: '200% 100%'
                    }}
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                    }}
                    transition={{ 
                      duration: 3, 
                      ease: 'linear', 
                      repeat: Infinity 
                    }}
                  ></motion.div>
                  
                  <span className="relative z-10 font-bold text-black flex items-center">
                    <i className="ri-share-line mr-2"></i>
                    Compartir
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 relative z-10 mt-auto">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>© 2025 Innovapyme Labs. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LabsPost;