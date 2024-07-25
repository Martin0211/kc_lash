'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosMenu, IoIosClose, IoIosHome, IoIosPerson, IoIosPaper } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para rastrear la visibilidad de la barra lateral

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado al hacer clic en el botón
  };

  const link = [
    {
      name: 'Inicio',
      href: '/dashboard',
      icon: IoIosHome,
    },
    {
      name: 'Suscriptores',
      href: '/dashboard/subscribed',
      icon: IoIosPerson,
    },
    {
      name: 'Expedientes',
      href: '/dashboard/records',
      icon: IoIosPaper,
    },
  ];

  const pathname = usePathname()
  
  return (
    <div className="w-full md:h-screen md:overflow-hidden md:sticky md:top-0 md:left-0">
      <div className='bg-[#01121EBA] md:mx-4 rounded-b-lg flex items-center'>
        <button
          className=" top-0 p-2 md:hidden"
          onClick={toggleSidebar}
        >{isOpen ? (
          <i className="fas fa-times"> <IoIosClose size={40} fill="white" /> </i>
        ) : (
          <i className="fas fa-bars"> <IoIosMenu size={40} fill="white" /> </i>
        )}
        </button>
        <div className='flex items-center bg-[#01121EBA] w-full pr-14 md:pr-0 rounded-br-lg md:rounded-b-lg justify-center	text-white h-16'>
        <strong>KC Lash</strong>
        </div>      
      </div>
      {/* Contenido de la barra lateral */}
      <div
        className={`${isOpen ? '' : 'hidden'
          } bg-white absolute flex justify-evenly px-4 py-3 border-b border-gray-200 w-full md:w:1/4 md:block md:h-screen md:snap-none `}
      >
        {link.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link key={link.name} href={link.href} className={`md:mt-2 md:mb-1 md:h-48px  p-2 rounded-lg md:rounded-md text-base flex items-center ${pathname === link.href ? 'bg-gray-700 text-white' : 'bg-gray-300 hover:text-gray-700'}
            `}>
              < LinkIcon className='md:w-6' size={40} /> &nbsp;
              <p className='hidden md:block'>{link.name}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default Sidebar;
