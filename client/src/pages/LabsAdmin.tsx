import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, Variants } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import ImageUploader from '../components/ImageUploader';

// Definición del tipo para cada post
interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  video_url?: string;
  created_at: string;
}

const LabsAdmin: React.FC = () => {
  // Estados para el formulario y posts existentes
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Estado para el formulario
  const [formData, setFormData] = useState<Omit<Post, 'id' | 'created_at'>>({
    title: '',
    content: '',
    image_url: '',
    video_url: ''
  });

  // Redirección
  const [, setLocation] = useLocation();
  
  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar del localStorage
    localStorage.removeItem('isAdmin');
    
    // Redirigir a la página principal de Labs
    setLocation('/labs');
    
    // Mensaje de confirmación 
    alert('Has cerrado sesión correctamente.');
  };

  // Cargar posts existentes usando la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/labs/posts');
        
        if (!response.ok) {
          throw new Error(`Error al cargar los posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los posts:', err);
        setError('No pudimos cargar los posts. Por favor, intenta nuevamente más tarde.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para generar un ID único
  const generateId = () => {
    return (posts.length + 1).toString();
  };

  // Función para editar un post existente
  const editPost = (post: Post) => {
    setFormData({
      title: post.title,
      content: post.content,
      image_url: post.image_url,
      video_url: post.video_url || ''
    });
    setEditingPostId(post.id);
    
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Función para eliminar un post
  const deletePost = async (postId: string, postTitle: string) => {
    // Pedir confirmación antes de eliminar
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar el post "${postTitle}"?`);
    
    if (!confirmed) return;
    
    try {
      // Llamar a la API para eliminar el post
      const response = await fetch(`/api/labs/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el post');
      }
      
      // Actualizar la lista de posts eliminando el post eliminado
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      
      // Mostrar mensaje de éxito
      setSuccess(`Post "${postTitle}" eliminado correctamente.`);
      
      // Si estaba editando ese post, limpiar el formulario
      if (editingPostId === postId) {
        cancelEdit();
      }
      
      // Después de 3 segundos, ocultar el mensaje de éxito
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error al eliminar post:', err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error al eliminar. Por favor, intenta nuevamente.');
      
      // Después de 3 segundos, ocultar el mensaje de error
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  // Función para cancelar la edición
  const cancelEdit = () => {
    setFormData({
      title: '',
      content: '',
      image_url: '',
      video_url: ''
    });
    setEditingPostId(null);
  };

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Manejar envío del formulario usando API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      // Validar datos requeridos
      if (!formData.title || !formData.content || !formData.image_url) {
        setError('Por favor completa todos los campos requeridos.');
        setSaving(false);
        return;
      }
      
      // Preparar datos para enviar a la API
      const postData = {
        title: formData.title,
        content: formData.content,
        image_url: formData.image_url,
        video_url: formData.video_url || null,
        published: true
      };
      
      let response;
      
      if (editingPostId) {
        // Actualizar post existente
        response = await fetch(`/api/labs/posts/${editingPostId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al actualizar el post');
        }
        
        // Obtener el post actualizado
        const updatedPost = await response.json();
        
        // Actualizar el estado local
        setPosts(prevPosts => prevPosts.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        ));
        
        setSuccess(`Post "${formData.title}" actualizado correctamente.`);
      } else {
        // Crear nuevo post
        response = await fetch('/api/labs/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al crear el post');
        }
        
        // Obtener el post creado
        const newPost = await response.json();
        
        // Actualizar el estado local
        setPosts(prevPosts => [...prevPosts, newPost]);
        
        setSuccess(`Post "${formData.title}" creado correctamente.`);
      }
      
      // Limpiar formulario
      setFormData({
        title: '',
        content: '',
        image_url: '',
        video_url: ''
      });
      setEditingPostId(null);
      
      setSaving(false);
      
      // Después de 3 segundos, ocultar el mensaje de éxito
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error al guardar el post:', err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error al guardar. Por favor, intenta nuevamente.');
      setSaving(false);
    }
  };

  // Animaciones
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

  const itemVariants: Variants = {
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
            <div className="text-white/80 flex items-center space-x-6">
              <Link href="/">
                <div className="hover:text-[#00EEFF] transition-colors duration-300 cursor-pointer flex items-center">
                  <i className="ri-home-line mr-1"></i>
                  Inicio
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-[#E65616] transition-colors duration-300 cursor-pointer flex items-center"
              >
                <i className="ri-logout-box-line mr-1"></i>
                Cerrar sesión
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 md:px-8 pt-16 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-4xl font-space font-bold mb-2 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Panel de Administración <span className="text-[#62d957]">Labs</span>
          </motion.h1>
          
          <motion.p 
            className="text-[#CCCCCC] mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Aquí puedes añadir, editar y gestionar los posts del blog de Labs.
          </motion.p>
          
          {/* Mensajes de éxito o error */}
          {error && (
            <motion.div 
              className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6 flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <i className="ri-error-warning-line text-xl mr-2 mt-0.5"></i>
              <div>
                <h3 className="font-bold">Error</h3>
                <p>{error}</p>
              </div>
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="bg-green-500/20 border border-green-500 text-white p-4 rounded-lg mb-6 flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <i className="ri-check-line text-xl mr-2 mt-0.5"></i>
              <div>
                <h3 className="font-bold">Éxito</h3>
                <p>{success}</p>
              </div>
            </motion.div>
          )}
          
          {/* Formulario de post */}
          <motion.div 
            className="glass rounded-xl p-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <i className={`ri-${editingPostId ? 'edit-line' : 'add-line'} mr-2 text-[#E65616]`}></i>
              {editingPostId ? 'Editar Post' : 'Nuevo Post'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Título <span className="text-[#E65616]">*</span>
                  </label>
                  <input 
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-[#030015]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#62d957] transition-all duration-300"
                    placeholder="Título del post"
                    required
                  />
                </div>
                
                <div>
                  <ImageUploader 
                    onImageUploaded={(imageUrl) => {
                      setFormData(prev => ({ ...prev, image_url: imageUrl }));
                    }}
                    currentImageUrl={formData.image_url}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="video_url" className="block text-sm font-medium mb-2">
                  URL de Video (opcional)
                </label>
                <input 
                  type="url"
                  id="video_url"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  className="w-full bg-[#030015]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#62d957] transition-all duration-300"
                  placeholder="https://www.youtube.com/embed/video-id"
                />
                <p className="text-xs text-[#CCCCCC] mt-1">Use el formato embed para videos de YouTube o Vimeo</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Contenido <span className="text-[#E65616]">*</span>
                </label>
                <textarea 
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full bg-[#030015]/50 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#62d957] transition-all duration-300"
                  placeholder="Contenido HTML del post..."
                  rows={10}
                  required
                ></textarea>
                <p className="text-xs text-[#CCCCCC] mt-1">El contenido puede incluir etiquetas HTML para formato</p>
              </div>
              
              <div className="flex gap-4 justify-end">
                {editingPostId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-3 glass rounded-full hover:bg-white/10 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
                
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-full relative overflow-hidden hover-shine"
                  disabled={saving}
                >
                  {/* Fondo con gradiente animado */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: 'linear-gradient(90deg, #E65616, #62d957, #E65616)',
                      backgroundSize: '200% 100%'
                    }}
                  ></div>
                  
                  <span className="relative z-10 font-bold text-black flex items-center">
                    {saving ? 'Guardando...' : (editingPostId ? 'Actualizar Post' : 'Crear Post')}
                    <i className={`ri-${saving ? 'loader-4-line animate-spin' : editingPostId ? 'save-line' : 'add-line'} ml-2`}></i>
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Lista de posts existentes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <i className="ri-file-list-3-line mr-2 text-[#62d957]"></i>
              Posts Existentes
            </h2>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="glass rounded-lg p-4 animate-pulse">
                    <div className="h-6 bg-[#CCCCCC]/10 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-[#CCCCCC]/10 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-[#CCCCCC]/10 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="glass rounded-lg p-6 text-center">
                <i className="ri-file-list-3-line text-4xl text-[#CCCCCC] mb-2"></i>
                <h3 className="text-lg font-medium mb-2">No hay posts disponibles</h3>
                <p className="text-[#CCCCCC]">Crea tu primer post con el formulario de arriba.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <motion.div 
                    key={post.id} 
                    className="glass rounded-lg p-5 hover:border-[#62d957]/50 border border-transparent transition-colors duration-300"
                    variants={itemVariants}
                    custom={index}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-sm text-[#CCCCCC] mb-3">
                          <i className="ri-calendar-line mr-1"></i> 
                          {formatDate(post.created_at)} | 
                          <i className="ri-file-list-line ml-2 mr-1"></i> 
                          ID: {post.id}
                        </p>
                        <div className="flex gap-3 text-sm">
                          <span className="flex items-center">
                            <i className="ri-image-line text-[#00EEFF] mr-1"></i> Imagen
                          </span>
                          {post.video_url && (
                            <span className="flex items-center">
                              <i className="ri-video-line text-[#E65616] mr-1"></i> Video
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => editPost(post)}
                          className="p-2 rounded-lg hover:bg-[#62d957]/20 transition-colors text-[#62d957]"
                          title="Editar post"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <Link href={`/labs/${post.id}`}>
                          <div
                            className="p-2 rounded-lg hover:bg-[#00EEFF]/20 transition-colors text-[#00EEFF] cursor-pointer"
                            title="Ver post"
                          >
                            <i className="ri-eye-line"></i>
                          </div>
                        </Link>
                        <button 
                          onClick={() => deletePost(post.id, post.title)}
                          className="p-2 rounded-lg hover:bg-[#E65616]/20 transition-colors text-[#E65616]"
                          title="Eliminar post"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Información de guardado */}
          <motion.div 
            className="mt-10 p-6 bg-[#050816] rounded-xl border border-[#E65616]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="ri-information-line mr-2 text-[#E65616]"></i>
              Panel de administración de Labs
            </h3>
            <p className="text-[#CCCCCC] mb-4">
              Este panel de administración te permite gestionar los posts del blog. Todos los cambios se guardan automáticamente en la base de datos.
            </p>
            
            <div className="border-t border-gray-800 pt-4 mt-4">
              <h4 className="text-md font-semibold mb-3 flex items-center">
                <i className="ri-database-2-line mr-2 text-[#62d957]"></i>
                Acciones de la base de datos
              </h4>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={async () => {
                    try {
                      setSaving(true);
                      setError(null);
                      
                      const response = await fetch('/api/init-db', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      });
                      
                      const result = await response.json();
                      
                      if (!response.ok) {
                        throw new Error(result.error || 'Error al inicializar la base de datos');
                      }
                      
                      // Refrescar la lista de posts
                      const postsResponse = await fetch('/api/labs/posts');
                      const postsData = await postsResponse.json();
                      setPosts(postsData);
                      
                      setSuccess('Base de datos inicializada correctamente con datos de ejemplo.');
                      setSaving(false);
                      
                      // Después de 3 segundos, ocultar el mensaje de éxito
                      setTimeout(() => {
                        setSuccess(null);
                      }, 3000);
                    } catch (err) {
                      console.error('Error al inicializar la base de datos:', err);
                      setError(err instanceof Error ? err.message : 'Error al inicializar la base de datos');
                      setSaving(false);
                    }
                  }}
                  className="px-4 py-2 rounded-lg glass hover:bg-[#62d957]/20 transition-colors text-[#62d957] flex items-center"
                  disabled={saving}
                >
                  <i className={`ri-${saving ? 'loader-4-line animate-spin' : 'refresh-line'} mr-2`}></i>
                  Importar datos de ejemplo
                </button>
              </div>
            </div>
            
            <div className="flex gap-4 items-center mt-6">
              <i className="ri-alert-line text-2xl text-[#E65616]"></i>
              <p className="text-sm italic text-white/80">
                Este panel de administración está conectado a una base de datos PostgreSQL. Todos los cambios son persistentes.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 relative z-10 mt-auto">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="text-center text-gray-400">
            <p>© 2025 Innovapyme Labs. Panel de Administración.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LabsAdmin;