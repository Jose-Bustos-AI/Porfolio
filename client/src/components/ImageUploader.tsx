import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImageUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Abrir el selector de archivos
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Manejar el cambio en el input de archivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      setError('El archivo seleccionado no es una imagen válida.');
      return;
    }
    
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen es demasiado grande. El tamaño máximo es 5MB.');
      return;
    }
    
    // Mostrar vista previa
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Preparar para subir
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      // Crear FormData para enviar el archivo
      const formData = new FormData();
      formData.append('image', file);
      
      // Simular progreso (en una aplicación real podrías usar XHR para rastrear el progreso real)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 20;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);
      
      // Enviar la imagen al servidor
      const response = await fetch('/api/uploads/image', {
        method: 'POST',
        body: formData
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }
      
      // Procesar respuesta
      const data = await response.json();
      setUploadProgress(100);
      
      // Notificar que la imagen se ha subido exitosamente
      onImageUploaded(data.imageUrl);
      
      // Limpiar después de un momento
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
      
    } catch (err) {
      console.error('Error al subir imagen:', err);
      setError(err instanceof Error ? err.message : 'Error al subir la imagen');
      setIsUploading(false);
      setUploadProgress(0);
      
      // Limpiar la vista previa si hay error
      if (previewUrl && previewUrl !== currentImageUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(currentImageUrl || null);
      }
    }
  };
  
  // Remover la imagen actual
  const handleRemoveImage = () => {
    if (previewUrl && previewUrl !== currentImageUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setPreviewUrl(null);
    onImageUploaded('');
  };
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Imagen <span className="text-[#E65616]">*</span>
      </label>
      
      <div className="flex items-start gap-4">
        {/* Área de previsualización */}
        <div 
          className={`w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden relative ${
            previewUrl ? 'border-[#62d957]/50' : 'border-gray-700 hover:border-[#00EEFF]/50'
          } transition-colors`}
          onClick={previewUrl ? undefined : triggerFileInput}
        >
          {previewUrl ? (
            <>
              <img 
                src={previewUrl} 
                alt="Vista previa" 
                className="w-full h-full object-cover"
              />
              
              {/* Botón para eliminar imagen */}
              <motion.button
                type="button"
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#E65616]/80 flex items-center justify-center text-white"
                onClick={handleRemoveImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-close-line text-xs"></i>
              </motion.button>
            </>
          ) : (
            <div className="text-center p-2">
              <i className="ri-image-add-line text-2xl text-[#00EEFF] mb-1"></i>
              <p className="text-xs text-[#CCCCCC]">Subir imagen</p>
            </div>
          )}
          
          {/* Indicador de carga */}
          {isUploading && (
            <div className="absolute inset-0 bg-[#030015]/70 flex flex-col items-center justify-center">
              <div className="w-full px-3">
                <div className="h-1 bg-[#0A0A18] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#62d957]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
                <p className="text-xs text-center mt-2 text-[#CCCCCC]">{Math.round(uploadProgress)}%</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          {/* Input de archivo oculto */}
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          
          {/* Botones de acción */}
          <div className="flex flex-wrap gap-2 mb-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-[#00EEFF]/20 transition-colors text-[#00EEFF] flex items-center"
              disabled={isUploading}
            >
              <i className="ri-upload-2-line mr-1"></i>
              {previewUrl ? 'Cambiar imagen' : 'Seleccionar archivo'}
            </button>
            
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1.5 text-sm rounded-lg glass hover:bg-[#E65616]/20 transition-colors text-[#E65616] flex items-center"
                disabled={isUploading}
              >
                <i className="ri-delete-bin-line mr-1"></i>
                Eliminar
              </button>
            )}
          </div>
          
          {/* Mensaje de error */}
          {error && (
            <p className="text-sm text-[#E65616] mt-1">{error}</p>
          )}
          
          {/* Información */}
          <p className="text-xs text-[#CCCCCC] mt-1">
            Formatos: JPG, PNG, GIF, WebP. Tamaño máximo: 5MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;