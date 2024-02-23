'use client'
import React from 'react';
import { BiShareAlt } from 'react-icons/bi';

export default function ButtonShare() {
  const handleClick = () => {
    const currentUrl = window.location.href;
    console.log('URL actual:', currentUrl);
    // Aquí puedes realizar más acciones si es necesario
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