'use client'
import React from 'react';
import { BiShareAlt } from 'react-icons/bi';

export default function ButtonShare() {
  const handleClick = async () => {
    const currentUrl = window.location.href;

    try {
      // Verificamos compatibilidad del navegador antes de compartir
      if (navigator.canShare) {
        const datosParaCompartir = {
          url: currentUrl,
          title: 'Compartir esta página', // Título opcional para el panel para compartir
        };

        await navigator.share(datosParaCompartir);
        console.log('¡Página compartida exitosamente!');
      } else {
        console.error('La API para compartir no está disponible en este navegador.');
        // Maneja comportamiento alternativo aquí, si es necesario
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      // Maneja errores de compartición aquí
    }
  };

  return (
    <button
      className='bg-slate-200 text-black rounded-full h-8 px-3'
      onClick={handleClick}
    >
      <BiShareAlt />
    </button>
  );
}