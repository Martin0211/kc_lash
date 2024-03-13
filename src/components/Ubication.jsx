'use client';
import { FaLocationDot } from 'react-icons/fa6';

export default function ButtonLocation() {
  return (
    <button
      className='flex items-center mb-4 text-white'
      onClick={() => {
        window.open(
          'https://maps.app.goo.gl/ERqxY5m4qLrQY4Wq5', // Replace with your desired profile URL
          '_blank'
        );
      }}
    >
      <FaLocationDot className='m-1 text-white' /> Queretaro
    </button>
  );
}
