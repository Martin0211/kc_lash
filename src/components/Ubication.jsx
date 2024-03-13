'use client'
import { FaLocationDot } from 'react-icons/fa6';

export default function ButtonLocation() {
  return (
    <button
      className='flex items-center mb-4 text-white'
      onClick={() => {
        window.open(
          'https://www.google.com/maps/dir/?api=1&destination=20.631646592133503, -100.399287734269',
          '_blank'
        );
      }}
    >
      <FaLocationDot className='m-1 text-white' /> Queretaro
    </button>
  );
}
